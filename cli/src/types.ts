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

export type CardCategory = "all" | "minimal" | "elevated" | "glass" | "gradient" | "bordered" | "interactive";

export interface Card {
  id: string;
  name: string;
  category: CardCategory;
  css: string;
  tailwind: string;
  isNew?: boolean;
}

export type InputCategory = "all" | "default" | "outlined" | "filled" | "floating" | "underlined" | "search";

export interface InputStyle {
  id: string;
  name: string;
  category: InputCategory;
  css: string;
  tailwind: string;
  isNew?: boolean;
  placeholder?: string;
}

export type BadgeCategory = "all" | "solid" | "outline" | "soft" | "pill" | "dot" | "status";

export interface Badge {
  id: string;
  name: string;
  category: BadgeCategory;
  css: string;
  tailwind: string;
  isNew?: boolean;
  label?: string;
}

export type LoaderCategory = "all" | "spinner" | "dots" | "bars" | "pulse" | "skeleton" | "progress";

export interface Loader {
  id: string;
  name: string;
  category: LoaderCategory;
  css: string;
  tailwind: string;
  isNew?: boolean;
}

export type AvatarCategory = "all" | "circle" | "rounded" | "ring" | "status" | "group" | "bordered";

export interface Avatar {
  id: string;
  name: string;
  category: AvatarCategory;
  css: string;
  tailwind: string;
  isNew?: boolean;
}

export type ToggleCategory = "all" | "default" | "ios" | "material" | "pill" | "icon" | "labeled";

export interface Toggle {
  id: string;
  name: string;
  category: ToggleCategory;
  css: string;
  tailwind: string;
  isNew?: boolean;
}

export type DividerCategory = "all" | "solid" | "dashed" | "gradient" | "decorated" | "text" | "fade";

export interface Divider {
  id: string;
  name: string;
  category: DividerCategory;
  css: string;
  tailwind: string;
  isNew?: boolean;
}

export type ComponentType = "pattern" | "button" | "card" | "input" | "badge" | "loader" | "avatar" | "toggle" | "divider";

export type Component = Pattern | Button | Card | InputStyle | Badge | Loader | Avatar | Toggle | Divider;
