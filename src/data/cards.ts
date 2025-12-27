export type CardCategory = "all" | "minimal" | "elevated" | "glass" | "gradient" | "bordered" | "interactive";

export interface Card {
  id: string;
  name: string;
  category: CardCategory;
  css: string;
  tailwind: string;
  isNew?: boolean;
}

export const cards: Card[] = [
  // MINIMAL CARDS
  {
    id: "minimal-clean",
    name: "Minimal Clean",
    category: "minimal",
    css: `background: #ffffff;
padding: 24px;
border-radius: 8px;`,
    tailwind: `bg-white p-6 rounded-lg`,
  },
  {
    id: "minimal-subtle",
    name: "Minimal Subtle",
    category: "minimal",
    css: `background: #fafafa;
padding: 24px;
border-radius: 12px;`,
    tailwind: `bg-gray-50 p-6 rounded-xl`,
  },
  {
    id: "minimal-dark",
    name: "Minimal Dark",
    category: "minimal",
    isNew: true,
    css: `background: #18181b;
color: #fafafa;
padding: 24px;
border-radius: 12px;`,
    tailwind: `bg-zinc-900 text-zinc-50 p-6 rounded-xl`,
  },

  // ELEVATED CARDS
  {
    id: "elevated-soft",
    name: "Elevated Soft",
    category: "elevated",
    css: `background: #ffffff;
padding: 24px;
border-radius: 12px;
box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);`,
    tailwind: `bg-white p-6 rounded-xl shadow-md`,
  },
  {
    id: "elevated-medium",
    name: "Elevated Medium",
    category: "elevated",
    css: `background: #ffffff;
padding: 24px;
border-radius: 16px;
box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);`,
    tailwind: `bg-white p-6 rounded-2xl shadow-lg`,
  },
  {
    id: "elevated-heavy",
    name: "Elevated Heavy",
    category: "elevated",
    isNew: true,
    css: `background: #ffffff;
padding: 28px;
border-radius: 20px;
box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);`,
    tailwind: `bg-white p-7 rounded-[20px] shadow-2xl`,
  },
  {
    id: "elevated-colored",
    name: "Elevated Colored",
    category: "elevated",
    css: `background: #ffffff;
padding: 24px;
border-radius: 12px;
box-shadow: 0 10px 40px -10px rgba(59, 130, 246, 0.3);`,
    tailwind: `bg-white p-6 rounded-xl shadow-[0_10px_40px_-10px_rgba(59,130,246,0.3)]`,
  },

  // GLASS CARDS
  {
    id: "glass-light",
    name: "Glass Light",
    category: "glass",
    isNew: true,
    css: `background: rgba(255, 255, 255, 0.7);
backdrop-filter: blur(12px);
padding: 24px;
border-radius: 16px;
border: 1px solid rgba(255, 255, 255, 0.3);`,
    tailwind: `bg-white/70 backdrop-blur-xl p-6 rounded-2xl border border-white/30`,
  },
  {
    id: "glass-dark",
    name: "Glass Dark",
    category: "glass",
    isNew: true,
    css: `background: rgba(0, 0, 0, 0.5);
backdrop-filter: blur(16px);
color: #ffffff;
padding: 24px;
border-radius: 16px;
border: 1px solid rgba(255, 255, 255, 0.1);`,
    tailwind: `bg-black/50 backdrop-blur-2xl text-white p-6 rounded-2xl border border-white/10`,
  },
  {
    id: "glass-frosted",
    name: "Glass Frosted",
    category: "glass",
    css: `background: rgba(255, 255, 255, 0.15);
backdrop-filter: blur(20px) saturate(180%);
padding: 24px;
border-radius: 20px;
border: 1px solid rgba(255, 255, 255, 0.2);
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);`,
    tailwind: `bg-white/15 backdrop-blur-[20px] backdrop-saturate-[180%] p-6 rounded-[20px] border border-white/20 shadow-lg`,
  },
  {
    id: "glass-aurora",
    name: "Glass Aurora",
    category: "glass",
    isNew: true,
    css: `background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
backdrop-filter: blur(20px);
color: #ffffff;
padding: 28px;
border-radius: 24px;
border: 1px solid rgba(255, 255, 255, 0.15);`,
    tailwind: `bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-[20px] text-white p-7 rounded-3xl border border-white/15`,
  },

  // GRADIENT CARDS
  {
    id: "gradient-sunset",
    name: "Gradient Sunset",
    category: "gradient",
    css: `background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
color: #ffffff;
padding: 24px;
border-radius: 16px;`,
    tailwind: `bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6 rounded-2xl`,
  },
  {
    id: "gradient-ocean",
    name: "Gradient Ocean",
    category: "gradient",
    isNew: true,
    css: `background: linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%);
color: #ffffff;
padding: 24px;
border-radius: 16px;`,
    tailwind: `bg-gradient-to-br from-sky-500 to-indigo-500 text-white p-6 rounded-2xl`,
  },
  {
    id: "gradient-fire",
    name: "Gradient Fire",
    category: "gradient",
    css: `background: linear-gradient(135deg, #f97316 0%, #ef4444 100%);
color: #ffffff;
padding: 24px;
border-radius: 16px;`,
    tailwind: `bg-gradient-to-br from-orange-500 to-red-500 text-white p-6 rounded-2xl`,
  },
  {
    id: "gradient-mint",
    name: "Gradient Mint",
    category: "gradient",
    css: `background: linear-gradient(135deg, #10b981 0%, #06b6d4 100%);
color: #ffffff;
padding: 24px;
border-radius: 16px;`,
    tailwind: `bg-gradient-to-br from-emerald-500 to-cyan-500 text-white p-6 rounded-2xl`,
  },
  {
    id: "gradient-dark",
    name: "Gradient Dark",
    category: "gradient",
    isNew: true,
    css: `background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
color: #ffffff;
padding: 24px;
border-radius: 16px;
border: 1px solid rgba(255, 255, 255, 0.1);`,
    tailwind: `bg-gradient-to-br from-gray-800 to-gray-900 text-white p-6 rounded-2xl border border-white/10`,
  },

  // BORDERED CARDS
  {
    id: "bordered-simple",
    name: "Bordered Simple",
    category: "bordered",
    css: `background: #ffffff;
padding: 24px;
border-radius: 12px;
border: 1px solid #e5e7eb;`,
    tailwind: `bg-white p-6 rounded-xl border border-gray-200`,
  },
  {
    id: "bordered-thick",
    name: "Bordered Thick",
    category: "bordered",
    css: `background: #ffffff;
padding: 24px;
border-radius: 12px;
border: 2px solid #d1d5db;`,
    tailwind: `bg-white p-6 rounded-xl border-2 border-gray-300`,
  },
  {
    id: "bordered-accent",
    name: "Bordered Accent",
    category: "bordered",
    isNew: true,
    css: `background: #ffffff;
padding: 24px;
border-radius: 12px;
border: 2px solid #3b82f6;`,
    tailwind: `bg-white p-6 rounded-xl border-2 border-blue-500`,
  },
  {
    id: "bordered-gradient",
    name: "Bordered Gradient",
    category: "bordered",
    isNew: true,
    css: `background: #ffffff;
padding: 24px;
border-radius: 16px;
border: 2px solid transparent;
background-image: linear-gradient(#ffffff, #ffffff), linear-gradient(135deg, #667eea, #764ba2);
background-origin: border-box;
background-clip: padding-box, border-box;`,
    tailwind: `bg-white p-6 rounded-2xl border-2 border-transparent bg-clip-padding [background-image:linear-gradient(white,white),linear-gradient(135deg,#667eea,#764ba2)] [background-origin:border-box]`,
  },
  {
    id: "bordered-dashed",
    name: "Bordered Dashed",
    category: "bordered",
    css: `background: #fafafa;
padding: 24px;
border-radius: 12px;
border: 2px dashed #d1d5db;`,
    tailwind: `bg-gray-50 p-6 rounded-xl border-2 border-dashed border-gray-300`,
  },

  // INTERACTIVE CARDS
  {
    id: "interactive-hover",
    name: "Interactive Hover",
    category: "interactive",
    css: `background: #ffffff;
padding: 24px;
border-radius: 12px;
border: 1px solid #e5e7eb;
transition: all 0.2s ease;
cursor: pointer;`,
    tailwind: `bg-white p-6 rounded-xl border border-gray-200 transition-all hover:shadow-lg hover:border-gray-300 cursor-pointer`,
  },
  {
    id: "interactive-lift",
    name: "Interactive Lift",
    category: "interactive",
    isNew: true,
    css: `background: #ffffff;
padding: 24px;
border-radius: 16px;
box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
transition: all 0.3s ease;
cursor: pointer;`,
    tailwind: `bg-white p-6 rounded-2xl shadow-md transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer`,
  },
  {
    id: "interactive-glow",
    name: "Interactive Glow",
    category: "interactive",
    isNew: true,
    css: `background: #ffffff;
padding: 24px;
border-radius: 16px;
border: 1px solid #e5e7eb;
transition: all 0.3s ease;
cursor: pointer;`,
    tailwind: `bg-white p-6 rounded-2xl border border-gray-200 transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:border-blue-300 cursor-pointer`,
  },
  {
    id: "interactive-scale",
    name: "Interactive Scale",
    category: "interactive",
    css: `background: #ffffff;
padding: 24px;
border-radius: 12px;
box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
transition: transform 0.2s ease;
cursor: pointer;`,
    tailwind: `bg-white p-6 rounded-xl shadow-md transition-transform hover:scale-105 cursor-pointer`,
  },
  {
    id: "interactive-press",
    name: "Interactive Press",
    category: "interactive",
    css: `background: #ffffff;
padding: 24px;
border-radius: 12px;
box-shadow: 0 4px 0 #e5e7eb;
transition: all 0.1s ease;
cursor: pointer;`,
    tailwind: `bg-white p-6 rounded-xl shadow-[0_4px_0_#e5e7eb] transition-all hover:translate-y-0.5 hover:shadow-[0_2px_0_#e5e7eb] active:translate-y-1 active:shadow-none cursor-pointer`,
  },
];

export const cardCategories: { id: CardCategory; label: string; emoji: string }[] = [
  { id: "all", label: "All", emoji: "✨" },
  { id: "minimal", label: "Minimal", emoji: "◻️" },
  { id: "elevated", label: "Elevated", emoji: "📦" },
  { id: "glass", label: "Glass", emoji: "🪟" },
  { id: "gradient", label: "Gradient", emoji: "🌈" },
  { id: "bordered", label: "Bordered", emoji: "🔲" },
  { id: "interactive", label: "Interactive", emoji: "👆" },
];

