export type PatternCategory = "all" | "gradients" | "geometric" | "decorative" | "effects";

export interface Pattern {
  id: string;
  name: string;
  category: PatternCategory;
  css: string;
  tailwind: string;
  isNew?: boolean;
}

export type ButtonCategory = "all" | "primary" | "secondary" | "outline" | "ghost" | "animated" | "3d" | "neon";

export interface Button {
  id: string;
  name: string;
  category: ButtonCategory;
  css: string;
  tailwind: string;
  label?: string;
  isNew?: boolean;
}

export type ComponentType = "pattern" | "button";

export type Component = Pattern | Button;
