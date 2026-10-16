"use client";

interface ExampleChipsProps {
  onSelect: (query: string) => void;
  disabled?: boolean;
}

const EXAMPLE_QUERIES = [
  "Explain RAG vs fine-tuning for support bots",
  "How do embeddings support RAG systems?",
  "When should I choose RAG for changing documentation?",
  "Create a note on prompt caching and connect it to LLM cost optimization",
];

export function ExampleChips({ onSelect, disabled }: ExampleChipsProps) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card/70 px-4 py-4 shadow-[0_10px_32px_-18px_rgba(15,23,42,0.18)] backdrop-blur-sm">
      <div className="mb-3">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Try an example
        </p>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          Use one of these prompts to quickly demonstrate note reuse, linking,
          and markdown updates.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {EXAMPLE_QUERIES.map((query) => (
          <button
            key={query}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(query)}
            className="rounded-full border border-border/60 bg-background/80 px-3 py-2 text-left text-xs font-medium leading-5 text-foreground transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-800 disabled:pointer-events-none disabled:opacity-50 dark:hover:border-blue-900/40 dark:hover:bg-blue-950/20 dark:hover:text-blue-300"
          >
            {query}
          </button>
        ))}
      </div>
    </div>
  );
}