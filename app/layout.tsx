import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Compiled Knowledge Agent",
    template: "%s · Compiled Knowledge Agent",
  },
  description:
    "A multi-agent AI system that reads and updates local markdown notes, builds wiki-style topic links, and generates structured answers without traditional vector RAG.",
  applicationName: "Compiled Knowledge Agent",
  keywords: [
    "agentic ai",
    "markdown knowledge base",
    "multi-agent workflow",
    "wiki memory",
    "next.js",
    "vercel",
  ],
  openGraph: {
    title: "Compiled Knowledge Agent",
    description:
      "Markdown-first multi-agent system that compiles local knowledge notes and links related topics.",
    type: "website",
  },
  metadataBase: new URL("https://example.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full font-sans text-foreground">{children}</body>
    </html>
  );
}