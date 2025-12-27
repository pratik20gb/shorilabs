export type DividerCategory = "all" | "solid" | "dashed" | "gradient" | "decorated" | "text" | "fade";

export interface Divider {
  id: string;
  name: string;
  category: DividerCategory;
  css: string;
  tailwind: string;
  isNew?: boolean;
}

export const dividers: Divider[] = [
  // SOLID DIVIDERS
  {
    id: "solid-thin",
    name: "Solid Thin",
    category: "solid",
    css: `width: 100%;
height: 1px;
background: #e5e7eb;`,
    tailwind: `w-full h-px bg-gray-200`,
  },
  {
    id: "solid-medium",
    name: "Solid Medium",
    category: "solid",
    css: `width: 100%;
height: 2px;
background: #d1d5db;`,
    tailwind: `w-full h-0.5 bg-gray-300`,
  },
  {
    id: "solid-thick",
    name: "Solid Thick",
    category: "solid",
    css: `width: 100%;
height: 4px;
background: #9ca3af;`,
    tailwind: `w-full h-1 bg-gray-400`,
  },
  {
    id: "solid-dark",
    name: "Solid Dark",
    category: "solid",
    isNew: true,
    css: `width: 100%;
height: 1px;
background: #374151;`,
    tailwind: `w-full h-px bg-gray-700`,
  },

  // DASHED DIVIDERS
  {
    id: "dashed-simple",
    name: "Dashed Simple",
    category: "dashed",
    css: `width: 100%;
border: none;
border-top: 1px dashed #d1d5db;`,
    tailwind: `w-full border-0 border-t border-dashed border-gray-300`,
  },
  {
    id: "dashed-thick",
    name: "Dashed Thick",
    category: "dashed",
    css: `width: 100%;
border: none;
border-top: 2px dashed #9ca3af;`,
    tailwind: `w-full border-0 border-t-2 border-dashed border-gray-400`,
  },
  {
    id: "dotted-simple",
    name: "Dotted Simple",
    category: "dashed",
    isNew: true,
    css: `width: 100%;
border: none;
border-top: 2px dotted #d1d5db;`,
    tailwind: `w-full border-0 border-t-2 border-dotted border-gray-300`,
  },

  // GRADIENT DIVIDERS
  {
    id: "gradient-blue",
    name: "Gradient Blue",
    category: "gradient",
    css: `width: 100%;
height: 2px;
background: linear-gradient(90deg, #3b82f6, #8b5cf6);
border-radius: 1px;`,
    tailwind: `w-full h-0.5 bg-gradient-to-r from-blue-500 to-violet-500 rounded-sm`,
  },
  {
    id: "gradient-rainbow",
    name: "Gradient Rainbow",
    category: "gradient",
    isNew: true,
    css: `width: 100%;
height: 2px;
background: linear-gradient(90deg, #ef4444, #f97316, #eab308, #22c55e, #3b82f6, #8b5cf6);
border-radius: 1px;`,
    tailwind: `w-full h-0.5 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 to-violet-500 rounded-sm`,
  },
  {
    id: "gradient-sunset",
    name: "Gradient Sunset",
    category: "gradient",
    css: `width: 100%;
height: 3px;
background: linear-gradient(90deg, #f97316, #ec4899);
border-radius: 2px;`,
    tailwind: `w-full h-[3px] bg-gradient-to-r from-orange-500 to-pink-500 rounded`,
  },

  // DECORATED DIVIDERS
  {
    id: "decorated-diamond",
    name: "Decorated Diamond",
    category: "decorated",
    css: `width: 100%;
display: flex;
align-items: center;
gap: 16px;

&::before, &::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #d1d5db;
}

.icon {
  width: 8px;
  height: 8px;
  background: #d1d5db;
  transform: rotate(45deg);
}`,
    tailwind: `w-full flex items-center gap-4 before:flex-1 before:h-px before:bg-gray-300 after:flex-1 after:h-px after:bg-gray-300 [&>.icon]:w-2 [&>.icon]:h-2 [&>.icon]:bg-gray-300 [&>.icon]:rotate-45`,
  },
  {
    id: "decorated-dots",
    name: "Decorated Dots",
    category: "decorated",
    isNew: true,
    css: `width: 100%;
display: flex;
align-items: center;
justify-content: center;
gap: 8px;

.dot {
  width: 6px;
  height: 6px;
  background: #d1d5db;
  border-radius: 50%;
}`,
    tailwind: `w-full flex items-center justify-center gap-2 [&>.dot]:w-1.5 [&>.dot]:h-1.5 [&>.dot]:bg-gray-300 [&>.dot]:rounded-full`,
  },
  {
    id: "decorated-stars",
    name: "Decorated Stars",
    category: "decorated",
    css: `width: 100%;
display: flex;
align-items: center;
gap: 12px;

&::before, &::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #d1d5db;
}

.stars {
  color: #fbbf24;
  font-size: 12px;
  letter-spacing: 4px;
}`,
    tailwind: `w-full flex items-center gap-3 before:flex-1 before:h-px before:bg-gray-300 after:flex-1 after:h-px after:bg-gray-300 [&>.stars]:text-amber-400 [&>.stars]:text-xs [&>.stars]:tracking-widest`,
  },

  // TEXT DIVIDERS
  {
    id: "text-or",
    name: "Text Or",
    category: "text",
    css: `width: 100%;
display: flex;
align-items: center;
gap: 16px;

&::before, &::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #e5e7eb;
}

span {
  color: #6b7280;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
}`,
    tailwind: `w-full flex items-center gap-4 before:flex-1 before:h-px before:bg-gray-200 after:flex-1 after:h-px after:bg-gray-200 [&>span]:text-gray-500 [&>span]:text-xs [&>span]:font-medium [&>span]:uppercase`,
  },
  {
    id: "text-custom",
    name: "Text Custom",
    category: "text",
    css: `width: 100%;
display: flex;
align-items: center;
gap: 20px;

&::before, &::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #d1d5db;
}

span {
  color: #374151;
  font-size: 14px;
  font-weight: 600;
}`,
    tailwind: `w-full flex items-center gap-5 before:flex-1 before:h-px before:bg-gray-300 after:flex-1 after:h-px after:bg-gray-300 [&>span]:text-gray-700 [&>span]:text-sm [&>span]:font-semibold`,
  },
  {
    id: "text-badge",
    name: "Text Badge",
    category: "text",
    isNew: true,
    css: `width: 100%;
display: flex;
align-items: center;
gap: 16px;

&::before, &::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #e5e7eb;
}

span {
  padding: 4px 12px;
  background: #f3f4f6;
  color: #374151;
  font-size: 12px;
  font-weight: 500;
  border-radius: 9999px;
}`,
    tailwind: `w-full flex items-center gap-4 before:flex-1 before:h-px before:bg-gray-200 after:flex-1 after:h-px after:bg-gray-200 [&>span]:px-3 [&>span]:py-1 [&>span]:bg-gray-100 [&>span]:text-gray-700 [&>span]:text-xs [&>span]:font-medium [&>span]:rounded-full`,
  },

  // FADE DIVIDERS
  {
    id: "fade-center",
    name: "Fade Center",
    category: "fade",
    css: `width: 100%;
height: 1px;
background: linear-gradient(90deg, transparent, #d1d5db 50%, transparent);`,
    tailwind: `w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent`,
  },
  {
    id: "fade-left",
    name: "Fade Left",
    category: "fade",
    css: `width: 100%;
height: 1px;
background: linear-gradient(90deg, #d1d5db, transparent);`,
    tailwind: `w-full h-px bg-gradient-to-r from-gray-300 to-transparent`,
  },
  {
    id: "fade-right",
    name: "Fade Right",
    category: "fade",
    isNew: true,
    css: `width: 100%;
height: 1px;
background: linear-gradient(90deg, transparent, #d1d5db);`,
    tailwind: `w-full h-px bg-gradient-to-r from-transparent to-gray-300`,
  },
  {
    id: "fade-glow",
    name: "Fade Glow",
    category: "fade",
    isNew: true,
    css: `width: 100%;
height: 2px;
background: linear-gradient(90deg, transparent, #3b82f6, transparent);
box-shadow: 0 0 8px rgba(59, 130, 246, 0.5);`,
    tailwind: `w-full h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_8px_rgba(59,130,246,0.5)]`,
  },
];

export const dividerCategories: { id: DividerCategory; label: string; emoji: string }[] = [
  { id: "all", label: "All", emoji: "✨" },
  { id: "solid", label: "Solid", emoji: "➖" },
  { id: "dashed", label: "Dashed", emoji: "➗" },
  { id: "gradient", label: "Gradient", emoji: "🌈" },
  { id: "decorated", label: "Decorated", emoji: "💎" },
  { id: "text", label: "Text", emoji: "📝" },
  { id: "fade", label: "Fade", emoji: "🌫️" },
];

