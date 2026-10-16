---
title: Embeddings
slug: embeddings
summary: Embeddings are dense vector representations of text that capture semantic meaning for similarity search and retrieval.
keyPoints:
  - Convert text into fixed-size numeric vectors
  - Enable semantic similarity comparisons
  - Foundation for most RAG retrieval systems
  - Quality varies by embedding model choice
  - Can be stored in vector databases for fast lookup
related:
  - rag
  - fine-tuning
updatedAt: 2026-04-07T10:00:00.000Z
---

# Embeddings

## Summary
Embeddings are dense vector representations of text that capture semantic meaning. They allow systems to compare text similarity mathematically, forming the backbone of modern retrieval systems used in RAG pipelines.

## Key Points
- Convert text into fixed-size numeric vectors
- Enable semantic similarity comparisons
- Foundation for most RAG retrieval systems
- Quality varies by embedding model choice
- Can be stored in vector databases for fast lookup

## Details
### How Embeddings Work
- Text is passed through an embedding model
- The model outputs a fixed-dimension vector (e.g., 1536 dimensions)
- Similar texts produce vectors that are close in vector space
- Cosine similarity or dot product measures closeness

### Common Embedding Models
- OpenAI text-embedding-ada-002 / text-embedding-3-small
- Sentence-BERT variants
- Cohere Embed
- Custom fine-tuned embedding models

### Use Cases
- Semantic search over documents
- RAG retrieval pipelines
- Clustering and categorization
- Duplicate detection
- Recommendation systems

## Related
- [[rag]]
- [[fine-tuning]]
