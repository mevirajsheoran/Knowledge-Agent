import matter from "gray-matter";
import type { KnowledgeNote } from "../types";

export function parseMarkdownNote(
  filePath: string,
  raw: string
): KnowledgeNote | null {
  try {
    const { data, content } = matter(raw);
    const slug =
      data.slug ||
      filePath
        .split(/[/\\]/)
        .pop()
        ?.replace(/\.md$/, "") ||
      "";

    return {
      title: data.title || slug,
      slug,
      summary: data.summary || "",
      keyPoints: Array.isArray(data.keyPoints) ? data.keyPoints : [],
      related: Array.isArray(data.related) ? data.related : [],
      updatedAt: data.updatedAt
        ? new Date(data.updatedAt).toISOString()
        : new Date().toISOString(),
      markdown: content.trim(),
      path: filePath,
    };
  } catch {
    return null;
  }
}

export function renderMarkdownNote(draft: {
  slug: string;
  title: string;
  summary: string;
  keyPoints: string[];
  related: string[];
  bodySections?: { heading: string; bullets: string[] }[];
}): string {
  const now = new Date().toISOString();

  // Build frontmatter
  const frontmatter: Record<string, unknown> = {
    title: draft.title,
    slug: draft.slug,
    summary: draft.summary,
    keyPoints: draft.keyPoints.slice(0, 8),
    related: draft.related.slice(0, 8),
    updatedAt: now,
  };

  const fm = matter.stringify("", frontmatter).trim();

  // Build body
  const lines: string[] = [fm, "", `# ${draft.title}`, ""];

  lines.push("## Summary");
  lines.push(draft.summary);
  lines.push("");

  if (draft.keyPoints.length > 0) {
    lines.push("## Key Points");
    for (const kp of draft.keyPoints.slice(0, 8)) {
      lines.push(`- ${kp}`);
    }
    lines.push("");
  }

  if (draft.bodySections && draft.bodySections.length > 0) {
    lines.push("## Details");
    for (const section of draft.bodySections) {
      lines.push(`### ${section.heading}`);
      for (const bullet of section.bullets) {
        lines.push(`- ${bullet}`);
      }
      lines.push("");
    }
  }

  if (draft.related.length > 0) {
    lines.push("## Related");
    for (const rel of draft.related.slice(0, 8)) {
      lines.push(`- [[${rel}]]`);
    }
    lines.push("");
  }

  return lines.join("\n");
}

export function createExcerpt(
  note: KnowledgeNote
): {
  title: string;
  slug: string;
  summary: string;
  keyPoints: string[];
  related: string[];
  excerpt: string;
  path: string;
} {
  const excerpt = note.markdown.slice(0, 500);
  return {
    title: note.title,
    slug: note.slug,
    summary: note.summary,
    keyPoints: note.keyPoints,
    related: note.related,
    excerpt,
    path: note.path,
  };
}
