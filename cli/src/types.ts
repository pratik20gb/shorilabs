export type PatternCategory = "all" | "gradients" | "geometric" | "decorative" | "effects";

export interface Pattern {
  id: string;
  name: string;
  category: PatternCategory;
  css: string;
  tailwind: string;
  isNew?: boolean;
}

