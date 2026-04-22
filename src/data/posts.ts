export type Post = {
  slug: string;
  title: string;
  date: string;
  era: string;
  tag: string;
  excerpt: string;
  body: string[];
  cover: { kind: "image" | "ascii"; src?: string; seed?: number };
  palette: string[];
};

export const POSTS: Post[] = [
  {
    slug: "static-bloom",
    title: "Static Bloom",
    date: "2026-03-14",
    era: "FIELD-NOTES / 03",
    tag: "PHOTO",
    excerpt:
      "A week chasing harsh sunlight off wet concrete. Everything in the city was yelling. I turned the contrast up to match.",
    body: [
      "The walk started at 5:04am. The camera was half-charged and I had one roll left of something expired from 2019.",
      "I am fascinated by the in-between frames — the ones where nobody noticed the shutter. I think a portrait is really a negotiation, and if neither of you is paying attention, the film wins.",
      "I came home with 38 frames. 4 survived.",
    ],
    cover: { kind: "image", src: "/images/kona.png" },
    palette: ["#CCFF00", "#0D0D0D", "#1A1A1A", "#F2F2F2"],
  },
  {
    slug: "machine-hymn",
    title: "Machine Hymn",
    date: "2026-02-02",
    era: "ZINE / 07",
    tag: "SOUND",
    excerpt:
      "Notes from a month of recording dead appliances, HVAC rooms, and one very angry washing machine. Turns out rooms sing.",
    body: [
      "I started this as a joke. It is not a joke anymore.",
      "The best field recording of the month was a freight elevator in a building that has since been demolished. I keep the raw file on a USB stick, unbacked up, because it feels correct to let it go eventually.",
    ],
    cover: { kind: "ascii", seed: 11 },
    palette: ["#CCFF00", "#2E2E2E", "#0D0D0D", "#F2F2F2"],
  },
  {
    slug: "kowloon-ghost",
    title: "Kowloon, Ghost Channel",
    date: "2026-01-18",
    era: "TRAVEL / 02",
    tag: "ESSAY",
    excerpt:
      "Three days of walking, three nights of tuning into the dead radio band between 91.1 and 91.3. Nothing, and then everything.",
    body: [
      "Between two active frequencies there's always a channel the station owners didn't pay for, and sometimes something leaks through from the building across the street.",
      "This is a notebook from one of those weeks.",
    ],
    cover: { kind: "image", src: "/images/sona/kona-black.png" },
    palette: ["#CCFF00", "#1A1A1A", "#2E2E2E", "#F2F2F2"],
  },
  {
    slug: "grid-of-saints",
    title: "A Grid of Saints",
    date: "2025-12-03",
    era: "PRINT / 01",
    tag: "DESIGN",
    excerpt:
      "A typographic study of every signmaker I could find on one block in Taipei. Hand-painted. Cheap paint. Better than anything on my machine.",
    body: [
      "The signs were photographed between 06:30 and 07:10 so the sun wouldn't flatten the paint.",
      "Every glyph is a compromise between the brush the painter had on Tuesday and the one they wish they'd bought on Monday.",
    ],
    cover: { kind: "ascii", seed: 31 },
    palette: ["#CCFF00", "#0D0D0D", "#2E2E2E", "#F2F2F2"],
  },
  {
    slug: "low-tide-lab",
    title: "Low Tide Lab",
    date: "2025-10-21",
    era: "FIELD-NOTES / 02",
    tag: "PHOTO",
    excerpt:
      "Collecting shapes the ocean leaves behind at 4am. A catalogue of negative space and patience.",
    body: [
      "The best shapes arrive after a storm and before the joggers. There is a one-hour window.",
      "I missed it more often than not.",
    ],
    cover: { kind: "image", src: "/images/sona/kona-white.png" },
    palette: ["#CCFF00", "#F2F2F2", "#2E2E2E", "#0D0D0D"],
  },
  {
    slug: "the-opposite-of-neon",
    title: "The Opposite of Neon",
    date: "2025-09-02",
    era: "ESSAY / 04",
    tag: "WRITING",
    excerpt:
      "Why I stopped designing things that want to be seen and started designing things that want to be found.",
    body: [
      "Attention is cheap. Attention is not the point.",
      "The best interface I used this year was an elevator button in a parking garage with one tiny scratch in a very specific place.",
    ],
    cover: { kind: "ascii", seed: 57 },
    palette: ["#CCFF00", "#0D0D0D", "#1A1A1A", "#F2F2F2"],
  },
];

export function postBySlug(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}
