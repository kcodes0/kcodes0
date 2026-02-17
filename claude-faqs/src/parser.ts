import type { FAQEntry } from "./types";

const FILLER_WORDS = new Set([
  "my", "i", "im", "ive", "me", "the", "a", "an", "is", "are", "was", "were",
  "do", "does", "did", "can", "could", "would", "should", "will", "what", "why",
  "how", "when", "where", "which", "who", "whom", "that", "this", "it", "its",
  "am", "be", "been", "being", "have", "has", "had", "having", "so", "to", "of",
  "in", "for", "on", "with", "at", "dont", "cant", "wont", "isnt", "arent",
  "wasnt", "werent", "doesnt", "didnt", "and", "or", "but", "not", "no", "yes",
  "if", "then", "than", "from", "by", "about", "up", "out", "get", "got",
]);

const GITHUB_BASE = "https://github.com/konacodes/konacodes/blob/main/claude-faqs/faq-content";

export function generateSlug(question: string): string {
  const words = question
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .split(/\s+/)
    .filter(w => w.length > 1 && !FILLER_WORDS.has(w));
  return words.slice(0, 4).join("-") || "untitled";
}

export function githubAnchor(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function extractTags(question: string, answer: string): string[] {
  const text = `${question} ${answer}`.toLowerCase();
  const words = text
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter(w => w.length > 2 && !FILLER_WORDS.has(w));
  const seen = new Set<string>();
  const tags: string[] = [];
  for (const w of words) {
    if (!seen.has(w) && tags.length < 10) {
      seen.add(w);
      tags.push(w);
    }
  }
  return tags;
}

interface ParsedAnswer {
  text: string;
  status: "answered" | "temp" | "stub";
}

function parseAnswer(raw: string): ParsedAnswer {
  const trimmed = raw.trim();

  if (!trimmed || trimmed === "</>") {
    return { text: "", status: "stub" };
  }

  const tempPatterns = [
    /^\*\*\[temp answer\]\*\*\s*/i,
    /^\[temp answer\]\s*/i,
  ];

  for (const pattern of tempPatterns) {
    if (pattern.test(trimmed)) {
      const text = trimmed.replace(pattern, "").trim();
      if (!text) return { text: "", status: "stub" };
      return { text, status: "temp" };
    }
  }

  return { text: trimmed, status: "answered" };
}

export function parseMarkdownFile(content: string, filename: string): FAQEntry[] {
  const lines = content.split("\n");
  const entries: FAQEntry[] = [];

  let category = "";
  let subcategory = "";
  let currentQuestion = "";
  let currentAnswerLines: string[] = [];
  const isGeneralFaq = filename === "general-faq.md";

  function flushEntry() {
    if (!currentQuestion) return;

    const rawAnswer = currentAnswerLines.join("\n").trim();
    const { text, status } = parseAnswer(rawAnswer);

    entries.push({
      id: "",
      slug: "",
      category,
      subcategory: isGeneralFaq ? category : subcategory,
      question: currentQuestion,
      answer: text,
      answer_status: status,
      source_file: filename,
      github_url: `${GITHUB_BASE}/${filename}#${githubAnchor(currentQuestion)}`,
      tags: extractTags(currentQuestion, text),
    });

    currentQuestion = "";
    currentAnswerLines = [];
  }

  for (const line of lines) {
    const h1Match = line.match(/^# (.+)$/);
    if (h1Match) {
      flushEntry();
      category = h1Match[1].trim();
      continue;
    }

    const h2Match = line.match(/^## (.+)$/);
    if (h2Match) {
      const heading = h2Match[1].trim();

      if (heading.toLowerCase().startsWith("still need help")) {
        flushEntry();
        break;
      }

      if (isGeneralFaq) {
        flushEntry();
        currentQuestion = heading;
      } else {
        flushEntry();
        subcategory = heading;
      }
      continue;
    }

    const h3Match = line.match(/^### (.+)$/);
    if (h3Match) {
      flushEntry();
      currentQuestion = h3Match[1].trim();
      continue;
    }

    if (currentQuestion) {
      currentAnswerLines.push(line);
    }
  }

  flushEntry();
  return entries;
}

export function assignSlugs(entries: FAQEntry[]): void {
  const slugCounts = new Map<string, number>();
  const baseSlugs = entries.map(e => generateSlug(e.question));

  for (const slug of baseSlugs) {
    slugCounts.set(slug, (slugCounts.get(slug) || 0) + 1);
  }

  const usedSlugs = new Map<string, number>();
  for (let i = 0; i < entries.length; i++) {
    const base = baseSlugs[i];
    let finalSlug: string;

    if (slugCounts.get(base)! > 1) {
      const stem = entries[i].source_file.replace(/\.md$/, "");
      finalSlug = `${base}-${stem}`;
    } else {
      finalSlug = base;
    }

    const count = usedSlugs.get(finalSlug) || 0;
    if (count > 0) {
      finalSlug = `${finalSlug}-${count + 1}`;
    }
    usedSlugs.set(finalSlug, count + 1);

    entries[i].slug = finalSlug;
    entries[i].id = `${entries[i].source_file.replace(/\.md$/, "")}/${finalSlug}`;
  }
}
