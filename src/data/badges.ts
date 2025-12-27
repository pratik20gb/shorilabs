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

export const badges: Badge[] = [
  // SOLID BADGES
  {
    id: "solid-primary",
    name: "Solid Primary",
    category: "solid",
    label: "Badge",
    css: `display: inline-flex;
align-items: center;
padding: 4px 10px;
border-radius: 6px;
background: #3b82f6;
color: #ffffff;
font-size: 12px;
font-weight: 500;`,
    tailwind: `inline-flex items-center px-2.5 py-1 rounded-md bg-blue-500 text-white text-xs font-medium`,
  },
  {
    id: "solid-success",
    name: "Solid Success",
    category: "solid",
    label: "Success",
    css: `display: inline-flex;
align-items: center;
padding: 4px 10px;
border-radius: 6px;
background: #10b981;
color: #ffffff;
font-size: 12px;
font-weight: 500;`,
    tailwind: `inline-flex items-center px-2.5 py-1 rounded-md bg-emerald-500 text-white text-xs font-medium`,
  },
  {
    id: "solid-warning",
    name: "Solid Warning",
    category: "solid",
    label: "Warning",
    css: `display: inline-flex;
align-items: center;
padding: 4px 10px;
border-radius: 6px;
background: #f59e0b;
color: #ffffff;
font-size: 12px;
font-weight: 500;`,
    tailwind: `inline-flex items-center px-2.5 py-1 rounded-md bg-amber-500 text-white text-xs font-medium`,
  },
  {
    id: "solid-danger",
    name: "Solid Danger",
    category: "solid",
    label: "Error",
    css: `display: inline-flex;
align-items: center;
padding: 4px 10px;
border-radius: 6px;
background: #ef4444;
color: #ffffff;
font-size: 12px;
font-weight: 500;`,
    tailwind: `inline-flex items-center px-2.5 py-1 rounded-md bg-red-500 text-white text-xs font-medium`,
  },

  // OUTLINE BADGES
  {
    id: "outline-primary",
    name: "Outline Primary",
    category: "outline",
    label: "Outline",
    css: `display: inline-flex;
align-items: center;
padding: 4px 10px;
border-radius: 6px;
border: 1px solid #3b82f6;
color: #3b82f6;
font-size: 12px;
font-weight: 500;
background: transparent;`,
    tailwind: `inline-flex items-center px-2.5 py-1 rounded-md border border-blue-500 text-blue-500 bg-transparent text-xs font-medium`,
  },
  {
    id: "outline-dark",
    name: "Outline Dark",
    category: "outline",
    isNew: true,
    label: "Dark",
    css: `display: inline-flex;
align-items: center;
padding: 4px 10px;
border-radius: 6px;
border: 1px solid #1f2937;
color: #1f2937;
font-size: 12px;
font-weight: 500;
background: transparent;`,
    tailwind: `inline-flex items-center px-2.5 py-1 rounded-md border border-gray-800 text-gray-800 bg-transparent text-xs font-medium`,
  },
  {
    id: "outline-gradient",
    name: "Outline Gradient",
    category: "outline",
    isNew: true,
    label: "Gradient",
    css: `display: inline-flex;
align-items: center;
padding: 4px 10px;
border-radius: 6px;
border: 1px solid transparent;
background: linear-gradient(#fff, #fff) padding-box, linear-gradient(135deg, #667eea, #764ba2) border-box;
color: #667eea;
font-size: 12px;
font-weight: 500;`,
    tailwind: `inline-flex items-center px-2.5 py-1 rounded-md border border-transparent [background:linear-gradient(white,white)_padding-box,linear-gradient(135deg,#667eea,#764ba2)_border-box] text-indigo-500 text-xs font-medium`,
  },

  // SOFT BADGES
  {
    id: "soft-blue",
    name: "Soft Blue",
    category: "soft",
    label: "Info",
    css: `display: inline-flex;
align-items: center;
padding: 4px 10px;
border-radius: 6px;
background: #dbeafe;
color: #1d4ed8;
font-size: 12px;
font-weight: 500;`,
    tailwind: `inline-flex items-center px-2.5 py-1 rounded-md bg-blue-100 text-blue-700 text-xs font-medium`,
  },
  {
    id: "soft-green",
    name: "Soft Green",
    category: "soft",
    label: "Complete",
    css: `display: inline-flex;
align-items: center;
padding: 4px 10px;
border-radius: 6px;
background: #d1fae5;
color: #047857;
font-size: 12px;
font-weight: 500;`,
    tailwind: `inline-flex items-center px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-700 text-xs font-medium`,
  },
  {
    id: "soft-purple",
    name: "Soft Purple",
    category: "soft",
    isNew: true,
    label: "New",
    css: `display: inline-flex;
align-items: center;
padding: 4px 10px;
border-radius: 6px;
background: #ede9fe;
color: #6d28d9;
font-size: 12px;
font-weight: 500;`,
    tailwind: `inline-flex items-center px-2.5 py-1 rounded-md bg-violet-100 text-violet-700 text-xs font-medium`,
  },
  {
    id: "soft-gray",
    name: "Soft Gray",
    category: "soft",
    label: "Default",
    css: `display: inline-flex;
align-items: center;
padding: 4px 10px;
border-radius: 6px;
background: #f3f4f6;
color: #374151;
font-size: 12px;
font-weight: 500;`,
    tailwind: `inline-flex items-center px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 text-xs font-medium`,
  },

  // PILL BADGES
  {
    id: "pill-primary",
    name: "Pill Primary",
    category: "pill",
    label: "Tag",
    css: `display: inline-flex;
align-items: center;
padding: 4px 12px;
border-radius: 9999px;
background: #3b82f6;
color: #ffffff;
font-size: 12px;
font-weight: 500;`,
    tailwind: `inline-flex items-center px-3 py-1 rounded-full bg-blue-500 text-white text-xs font-medium`,
  },
  {
    id: "pill-soft",
    name: "Pill Soft",
    category: "pill",
    label: "Category",
    css: `display: inline-flex;
align-items: center;
padding: 4px 12px;
border-radius: 9999px;
background: #fef3c7;
color: #b45309;
font-size: 12px;
font-weight: 500;`,
    tailwind: `inline-flex items-center px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-medium`,
  },
  {
    id: "pill-outline",
    name: "Pill Outline",
    category: "pill",
    isNew: true,
    label: "Label",
    css: `display: inline-flex;
align-items: center;
padding: 4px 12px;
border-radius: 9999px;
border: 1px solid #6366f1;
color: #6366f1;
font-size: 12px;
font-weight: 500;
background: transparent;`,
    tailwind: `inline-flex items-center px-3 py-1 rounded-full border border-indigo-500 text-indigo-500 bg-transparent text-xs font-medium`,
  },

  // DOT BADGES
  {
    id: "dot-success",
    name: "Dot Success",
    category: "dot",
    label: "Active",
    css: `display: inline-flex;
align-items: center;
gap: 6px;
padding: 4px 10px;
border-radius: 6px;
background: #f3f4f6;
color: #374151;
font-size: 12px;
font-weight: 500;`,
    tailwind: `inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 text-xs font-medium before:content-[''] before:w-2 before:h-2 before:rounded-full before:bg-emerald-500`,
  },
  {
    id: "dot-warning",
    name: "Dot Warning",
    category: "dot",
    isNew: true,
    label: "Pending",
    css: `display: inline-flex;
align-items: center;
gap: 6px;
padding: 4px 10px;
border-radius: 6px;
background: #f3f4f6;
color: #374151;
font-size: 12px;
font-weight: 500;`,
    tailwind: `inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 text-xs font-medium before:content-[''] before:w-2 before:h-2 before:rounded-full before:bg-amber-500`,
  },
  {
    id: "dot-danger",
    name: "Dot Danger",
    category: "dot",
    label: "Offline",
    css: `display: inline-flex;
align-items: center;
gap: 6px;
padding: 4px 10px;
border-radius: 6px;
background: #f3f4f6;
color: #374151;
font-size: 12px;
font-weight: 500;`,
    tailwind: `inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 text-xs font-medium before:content-[''] before:w-2 before:h-2 before:rounded-full before:bg-red-500`,
  },
  {
    id: "dot-pulse",
    name: "Dot Pulse",
    category: "dot",
    isNew: true,
    label: "Live",
    css: `display: inline-flex;
align-items: center;
gap: 6px;
padding: 4px 10px;
border-radius: 6px;
background: #f3f4f6;
color: #374151;
font-size: 12px;
font-weight: 500;`,
    tailwind: `inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 text-xs font-medium before:content-[''] before:w-2 before:h-2 before:rounded-full before:bg-emerald-500 before:animate-pulse`,
  },

  // STATUS BADGES
  {
    id: "status-online",
    name: "Status Online",
    category: "status",
    label: "Online",
    css: `display: inline-flex;
align-items: center;
gap: 6px;
padding: 6px 12px;
border-radius: 9999px;
background: #d1fae5;
color: #047857;
font-size: 12px;
font-weight: 600;`,
    tailwind: `inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold before:content-[''] before:w-2 before:h-2 before:rounded-full before:bg-emerald-500`,
  },
  {
    id: "status-away",
    name: "Status Away",
    category: "status",
    label: "Away",
    css: `display: inline-flex;
align-items: center;
gap: 6px;
padding: 6px 12px;
border-radius: 9999px;
background: #fef3c7;
color: #b45309;
font-size: 12px;
font-weight: 600;`,
    tailwind: `inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold before:content-[''] before:w-2 before:h-2 before:rounded-full before:bg-amber-500`,
  },
  {
    id: "status-busy",
    name: "Status Busy",
    category: "status",
    isNew: true,
    label: "Busy",
    css: `display: inline-flex;
align-items: center;
gap: 6px;
padding: 6px 12px;
border-radius: 9999px;
background: #fee2e2;
color: #b91c1c;
font-size: 12px;
font-weight: 600;`,
    tailwind: `inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-100 text-red-700 text-xs font-semibold before:content-[''] before:w-2 before:h-2 before:rounded-full before:bg-red-500`,
  },
];

export const badgeCategories: { id: BadgeCategory; label: string; emoji: string }[] = [
  { id: "all", label: "All", emoji: "✨" },
  { id: "solid", label: "Solid", emoji: "🔵" },
  { id: "outline", label: "Outline", emoji: "⭕" },
  { id: "soft", label: "Soft", emoji: "🌸" },
  { id: "pill", label: "Pill", emoji: "💊" },
  { id: "dot", label: "Dot", emoji: "🔘" },
  { id: "status", label: "Status", emoji: "📶" },
];

