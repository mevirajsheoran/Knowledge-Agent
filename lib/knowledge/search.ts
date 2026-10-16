import type { KnowledgeNote, NoteExcerpt } from "../types";
import { createExcerpt } from "./markdown";

const STOP_WORDS = new Set([
  "the", "is", "for", "a", "an", "and", "or", "but", "in", "on",
  "at", "to", "of", "it", "its", "by", "as", "be", "are", "was",
  "were", "been", "being", "have", "has", "had", "do", "does",
  "did", "will", "would", "could", "should", "may", "might",
  "shall", "can", "this", "that", "these", "those", "with",
  "from", "not", "no", "what", "when", "where", "how", "why",
  "which", "who", "whom", "i", "me", "my", "we", "our", "you",
  "your", "he", "she", "they", "them", "their",
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOP_WORDS.has(w));
}

export function searchRelevantNotes(
  query: string,
  notes: KnowledgeNote[],
  maxResults = 4
): NoteExcerpt[] {
  const queryTokens = tokenize(query);
  const queryPhrase = query.toLowerCase().trim();

  const scored = notes.map((note) => {
    let score = 0;
    const titleLower = note.title.toLowerCase();
    const summaryLower = note.summary.toLowerCase();
    const bodyLower = note.markdown.toLowerCase();
    const keyPointsText = note.keyPoints.join(" ").toLowerCase();

    // +5 if full query phrase appears in title
    if (titleLower.includes(queryPhrase)) {
      score += 5;
    }

    for (const token of queryTokens) {
      // +3 for each query term match in title
      if (titleLower.includes(token)) score += 3;
      // +2 for each term in summary
      if (summaryLower.includes(token)) score += 2;
      // +1 for each term in key points/body
      if (keyPointsText.includes(token)) score += 1;
      if (bodyLower.includes(token)) score += 1;
    }

    // +2 for each related topic that matches a query token
    for (const rel of note.related) {
      const relLower = rel.toLowerCase();
      for (const token of queryTokens) {
        if (relLower.includes(token)) {
          score += 2;
          break;
        }
      }
    }

    return { note, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults)
    .map((s) => ({
      ...createExcerpt(s.note),
      score: s.score,
    }));
}
