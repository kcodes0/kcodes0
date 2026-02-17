import type { FAQEntry } from "./types";

const WEIGHTS = {
  slug: 3,
  question: 2,
  subcategory: 1.5,
  tag: 1,
  answer: 0.5,
};

export function searchEntries(entries: FAQEntry[], query: string, limit = 5): FAQEntry[] {
  const terms = query
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter(t => t.length > 0);

  if (terms.length === 0) return [];

  const scored = entries.map(entry => {
    let score = 0;

    for (const term of terms) {
      if (entry.slug.includes(term)) score += WEIGHTS.slug;
      if (entry.question.toLowerCase().includes(term)) score += WEIGHTS.question;
      if (entry.subcategory.toLowerCase().includes(term)) score += WEIGHTS.subcategory;
      if (entry.tags.some(t => t.includes(term))) score += WEIGHTS.tag;
      if (entry.answer.toLowerCase().includes(term)) score += WEIGHTS.answer;
    }

    return { entry, score };
  });

  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(s => s.entry);
}
