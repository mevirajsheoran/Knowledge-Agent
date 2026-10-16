import path from "path";
import fs from "fs/promises";
import { parseMarkdownNote } from "@/lib/knowledge/markdown";
import type { KnowledgeNote } from "../types";

let seeded = false;

export async function getKnowledgeRoot(): Promise<{
  root: string;
  storageMode: "local" | "vercel-tmp";
}> {
  if (process.env.VERCEL) {
    const tmpRoot = "/tmp/knowledge";
    await fs.mkdir(tmpRoot, { recursive: true });

    if (!seeded) {
      const repoRoot = path.join(process.cwd(), "knowledge");
      const seededMarker = path.join(tmpRoot, ".seeded");

      try {
        await fs.access(seededMarker);
      } catch {
        try {
          const files = await fs.readdir(repoRoot);
          for (const file of files) {
            if (file.endsWith(".md")) {
              const src = path.join(repoRoot, file);
              const dest = path.join(tmpRoot, file);
              await fs.copyFile(src, dest);
            }
          }
        } catch {
          // repo knowledge dir may not exist
        }
        await fs.writeFile(seededMarker, "seeded");
      }
      seeded = true;
    }

    return { root: tmpRoot, storageMode: "vercel-tmp" };
  }

  const localRoot = path.join(process.cwd(), "knowledge");
  await fs.mkdir(localRoot, { recursive: true });
  return { root: localRoot, storageMode: "local" };
}

export async function listKnowledgeNotes(): Promise<{
  notes: KnowledgeNote[];
  storageMode: "local" | "vercel-tmp";
}> {
  const { root, storageMode } = await getKnowledgeRoot();

  let files: string[];
  try {
    files = await fs.readdir(root);
  } catch {
    return { notes: [], storageMode };
  }

  const mdFiles = files.filter((f) => f.endsWith(".md"));
  const notes: KnowledgeNote[] = [];

  for (const file of mdFiles) {
    const filePath = path.join(root, file);
    try {
      const raw = await fs.readFile(filePath, "utf-8");
      const note = parseMarkdownNote(filePath, raw);
      if (note) notes.push(note);
    } catch {
      // skip unreadable files
    }
  }

  return { notes, storageMode };
}

export async function readKnowledgeNote(
  slug: string
): Promise<KnowledgeNote | null> {
  const { root } = await getKnowledgeRoot();
  const filePath = path.join(root, `${slug}.md`);

  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return parseMarkdownNote(filePath, raw);
  } catch {
    return null;
  }
}

export async function writeKnowledgeNote(
  slug: string,
  markdownContent: string
): Promise<string> {
  const { root } = await getKnowledgeRoot();
  const filePath = path.join(root, `${slug}.md`);
  await fs.writeFile(filePath, markdownContent, "utf-8");
  return filePath;
}

export async function noteExists(slug: string): Promise<boolean> {
  const { root } = await getKnowledgeRoot();
  const filePath = path.join(root, `${slug}.md`);
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}
