# Compiled Knowledge Agent

A multi-agent AI system that reads and updates local markdown notes, builds wiki-style topic links, and generates structured answers — without traditional vector RAG.

## Features

- **Master Orchestrator** — deterministic pipeline coordinating 5 specialized agents
- **5 Agents** — Research, Summarizer, Linking, Writer, Validator
- **Markdown-first Knowledge** — no vector DB, no embeddings; notes stored as `.md` files with frontmatter
- **Wikilink Generation** — `[[topic]]` cross-references between notes
- **File Operations** — creates new notes and updates existing ones
- **Compiled Knowledge** — knowledge accumulates across queries
- **Vercel + Local** — ephemeral `/tmp` storage on Vercel, persistent local storage for dev

## Architecture

```
User Query
    │
    ▼
┌─────────────────────────┐
│   Master Orchestrator   │
├─────────────────────────┤
│ 1. Scan knowledge base  │  ← keyword search over markdown files
│ 2. Research Agent       │  ← extract context from existing notes
│ 3. Summarizer Agent     │  ← condense findings into structure
│ 4. Linking Agent        │  ← plan note create/update operations
│ 5. Writer Agent         │  ← draft answer + note content
│ 6. Validator Agent      │  ← check consistency before persist
│ 7. Persist notes        │  ← write markdown files to disk
└─────────────────────────┘
    │
    ▼
Structured Answer + Updated Markdown Notes
```

**Key design decisions:**
- Deterministic orchestrator (not LLM-routed)
- Simple keyword scoring for note retrieval (no vector DB)
- Structured LLM outputs via Zod schemas
- Code-side validation + sanitization after LLM output
- Max 3 note writes per run to keep output curated

## Tech Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS** + **shadcn/ui**
- **Vercel AI SDK** + **Google Gemini** (gemini-2.0-flash)
- **gray-matter** for markdown frontmatter parsing
- **react-markdown** for note preview rendering
- Node `fs/promises` for local file operations

## Run Locally

```bash
# Clone and install
git clone <repo-url>
cd mini-markdown-wiki-agent
npm install

# Set up environment
cp .env.example .env.local
# Add your Gemini API key to .env.local

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

```env
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.0-flash
```

## Sample Queries

1. **Explain RAG vs fine-tuning for support bots**
2. **How do embeddings support RAG systems?**
3. **When should I choose RAG for changing documentation?**
4. **Create a note on prompt caching and connect it to LLM cost optimization**

## Knowledge Storage

Notes are stored as markdown files with YAML frontmatter:

```markdown
---
title: RAG
slug: rag
summary: Retrieval-Augmented Generation combines...
keyPoints:
  - Useful when knowledge changes frequently
  - Quality depends on retrieval quality
related:
  - embeddings
  - fine-tuning
updatedAt: 2026-04-07T10:00:00.000Z
---

# RAG

## Summary
...

## Related
- [[embeddings]]
- [[fine-tuning]]
```

## Deployment

### Vercel

On Vercel, the app automatically:
- Seeds `/tmp/knowledge` from the committed `knowledge/` directory
- Reads and writes notes in `/tmp/knowledge` (ephemeral)
- Displays a notice in the UI when running in Vercel mode

> **Note:** On Vercel, markdown storage is ephemeral and resets on cold starts. Local mode persists notes to `./knowledge` on disk.

### Deploy to Vercel

```bash
# Push to GitHub, then import to Vercel
# Set GOOGLE_GENERATIVE_AI_API_KEY in Vercel environment variables
```

## Project Structure

```
├── app/
│   ├── api/run/route.ts          # POST API endpoint
│   ├── globals.css               # Tailwind + shadcn styles
│   ├── layout.tsx                # Root layout with fonts
│   └── page.tsx                  # Main dashboard page
├── components/
│   ├── app-header.tsx            # Header with badges
│   ├── query-form.tsx            # Query input form
│   ├── example-chips.tsx         # Sample query chips
│   ├── workflow-panel.tsx        # Agent pipeline status
│   ├── answer-panel.tsx          # Structured answer display
│   ├── file-changes-panel.tsx    # File operation badges
│   ├── notes-panel.tsx           # Markdown note previews
│   └── empty-state.tsx           # Initial empty state
├── lib/
│   ├── agents/
│   │   ├── master-agent.ts       # Orchestrator
│   │   ├── research-agent.ts     # Context extraction
│   │   ├── summarizer-agent.ts   # Finding condensation
│   │   ├── linking-agent.ts      # Note operation planning
│   │   ├── writer-agent.ts       # Answer + note drafting
│   │   └── validator-agent.ts    # Consistency checking
│   ├── ai/
│   │   ├── model.ts              # Gemini model config
│   │   ├── prompts.ts            # Agent system prompts
│   │   └── schemas.ts            # Zod output schemas
│   ├── knowledge/
│   │   ├── fs.ts                 # File system operations
│   │   ├── markdown.ts           # Parse/render markdown
│   │   └── search.ts             # Keyword-based search
│   └── types.ts                  # TypeScript interfaces
├── knowledge/                    # Seed + generated notes
│   ├── rag.md
│   ├── fine-tuning.md
│   ├── embeddings.md
│   └── support-chatbots.md
├── .env.example
└── README.md
```

## Demo

- **Live URL:** [[Vercel deployment link](https://compiled-knowledge-agent.vercel.app/)]

