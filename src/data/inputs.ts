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

export const inputs: InputStyle[] = [
  // DEFAULT INPUTS
  {
    id: "default-basic",
    name: "Default Basic",
    category: "default",
    placeholder: "Enter text...",
    css: `padding: 10px 14px;
border-radius: 8px;
border: 1px solid #d1d5db;
font-size: 14px;
outline: none;
transition: border-color 0.2s ease;`,
    tailwind: `px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all`,
  },
  {
    id: "default-rounded",
    name: "Default Rounded",
    category: "default",
    placeholder: "Type here...",
    css: `padding: 12px 18px;
border-radius: 9999px;
border: 1px solid #e5e7eb;
font-size: 14px;
outline: none;
transition: all 0.2s ease;`,
    tailwind: `px-4 py-3 rounded-full border border-gray-200 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all`,
  },
  {
    id: "default-large",
    name: "Default Large",
    category: "default",
    isNew: true,
    placeholder: "Enter value",
    css: `padding: 16px 20px;
border-radius: 12px;
border: 2px solid #e5e7eb;
font-size: 16px;
outline: none;
transition: all 0.2s ease;`,
    tailwind: `px-5 py-4 rounded-xl border-2 border-gray-200 text-base outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all`,
  },

  // OUTLINED INPUTS
  {
    id: "outlined-primary",
    name: "Outlined Primary",
    category: "outlined",
    placeholder: "Primary input",
    css: `padding: 12px 16px;
border-radius: 8px;
border: 2px solid #3b82f6;
background: transparent;
font-size: 14px;
outline: none;
transition: all 0.2s ease;`,
    tailwind: `px-4 py-3 rounded-lg border-2 border-blue-500 bg-transparent text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all`,
  },
  {
    id: "outlined-dark",
    name: "Outlined Dark",
    category: "outlined",
    isNew: true,
    placeholder: "Dark outline",
    css: `padding: 12px 16px;
border-radius: 8px;
border: 2px solid #1f2937;
background: transparent;
font-size: 14px;
outline: none;
transition: all 0.2s ease;`,
    tailwind: `px-4 py-3 rounded-lg border-2 border-gray-800 bg-transparent text-sm outline-none focus:ring-2 focus:ring-gray-800/20 transition-all`,
  },
  {
    id: "outlined-gradient",
    name: "Outlined Gradient",
    category: "outlined",
    isNew: true,
    placeholder: "Gradient border",
    css: `padding: 12px 16px;
border-radius: 10px;
border: 2px solid transparent;
background: linear-gradient(#ffffff, #ffffff) padding-box, linear-gradient(135deg, #667eea, #764ba2) border-box;
font-size: 14px;
outline: none;`,
    tailwind: `px-4 py-3 rounded-[10px] border-2 border-transparent [background:linear-gradient(white,white)_padding-box,linear-gradient(135deg,#667eea,#764ba2)_border-box] text-sm outline-none`,
  },

  // FILLED INPUTS
  {
    id: "filled-gray",
    name: "Filled Gray",
    category: "filled",
    placeholder: "Gray background",
    css: `padding: 12px 16px;
border-radius: 8px;
border: none;
background: #f3f4f6;
font-size: 14px;
outline: none;
transition: all 0.2s ease;`,
    tailwind: `px-4 py-3 rounded-lg border-none bg-gray-100 text-sm outline-none focus:bg-gray-50 focus:ring-2 focus:ring-blue-500/20 transition-all`,
  },
  {
    id: "filled-dark",
    name: "Filled Dark",
    category: "filled",
    isNew: true,
    placeholder: "Dark mode",
    css: `padding: 12px 16px;
border-radius: 8px;
border: none;
background: #1f2937;
color: #ffffff;
font-size: 14px;
outline: none;
transition: all 0.2s ease;`,
    tailwind: `px-4 py-3 rounded-lg border-none bg-gray-800 text-white placeholder:text-gray-400 text-sm outline-none focus:bg-gray-700 focus:ring-2 focus:ring-blue-500/20 transition-all`,
  },
  {
    id: "filled-soft",
    name: "Filled Soft",
    category: "filled",
    placeholder: "Soft blue",
    css: `padding: 12px 16px;
border-radius: 10px;
border: none;
background: #dbeafe;
color: #1e40af;
font-size: 14px;
outline: none;
transition: all 0.2s ease;`,
    tailwind: `px-4 py-3 rounded-[10px] border-none bg-blue-100 text-blue-800 placeholder:text-blue-400 text-sm outline-none focus:bg-blue-50 focus:ring-2 focus:ring-blue-500/20 transition-all`,
  },

  // FLOATING LABEL INPUTS (container styles)
  {
    id: "floating-basic",
    name: "Floating Basic",
    category: "floating",
    placeholder: "Label",
    css: `position: relative;
padding: 20px 14px 8px;
border-radius: 8px;
border: 1px solid #d1d5db;
font-size: 14px;
outline: none;
transition: all 0.2s ease;`,
    tailwind: `relative pt-5 pb-2 px-3.5 rounded-lg border border-gray-300 text-sm outline-none peer focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all`,
  },
  {
    id: "floating-filled",
    name: "Floating Filled",
    category: "floating",
    isNew: true,
    placeholder: "Email",
    css: `position: relative;
padding: 22px 14px 10px;
border-radius: 8px 8px 0 0;
border: none;
border-bottom: 2px solid #d1d5db;
background: #f3f4f6;
font-size: 14px;
outline: none;
transition: all 0.2s ease;`,
    tailwind: `relative pt-5 pb-2.5 px-3.5 rounded-t-lg border-0 border-b-2 border-gray-300 bg-gray-100 text-sm outline-none peer focus:border-blue-500 transition-all`,
  },

  // UNDERLINED INPUTS
  {
    id: "underlined-simple",
    name: "Underlined Simple",
    category: "underlined",
    placeholder: "Simple underline",
    css: `padding: 8px 0;
border: none;
border-bottom: 1px solid #d1d5db;
background: transparent;
font-size: 14px;
outline: none;
border-radius: 0;
transition: border-color 0.2s ease;`,
    tailwind: `py-2 px-0 border-0 border-b border-gray-300 bg-transparent text-sm outline-none focus:border-blue-500 transition-colors`,
  },
  {
    id: "underlined-thick",
    name: "Underlined Thick",
    category: "underlined",
    placeholder: "Thick underline",
    css: `padding: 10px 0;
border: none;
border-bottom: 2px solid #1f2937;
background: transparent;
font-size: 14px;
outline: none;
border-radius: 0;
transition: border-color 0.2s ease;`,
    tailwind: `py-2.5 px-0 border-0 border-b-2 border-gray-800 bg-transparent text-sm outline-none focus:border-blue-500 transition-colors`,
  },
  {
    id: "underlined-animated",
    name: "Underlined Animated",
    category: "underlined",
    isNew: true,
    placeholder: "Animated",
    css: `padding: 10px 0;
border: none;
border-bottom: 2px solid #e5e7eb;
background: transparent;
font-size: 14px;
outline: none;
border-radius: 0;
transition: all 0.3s ease;`,
    tailwind: `py-2.5 px-0 border-0 border-b-2 border-gray-200 bg-transparent text-sm outline-none focus:border-blue-500 transition-all`,
  },

  // SEARCH INPUTS
  {
    id: "search-basic",
    name: "Search Basic",
    category: "search",
    placeholder: "Search...",
    css: `padding: 10px 14px 10px 40px;
border-radius: 8px;
border: 1px solid #e5e7eb;
font-size: 14px;
outline: none;
transition: all 0.2s ease;`,
    tailwind: `pl-10 pr-3.5 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all`,
  },
  {
    id: "search-rounded",
    name: "Search Rounded",
    category: "search",
    isNew: true,
    placeholder: "Search anything",
    css: `padding: 12px 18px 12px 44px;
border-radius: 9999px;
border: none;
background: #f3f4f6;
font-size: 14px;
outline: none;
transition: all 0.2s ease;`,
    tailwind: `pl-11 pr-4 py-3 rounded-full border-none bg-gray-100 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:shadow-lg transition-all`,
  },
  {
    id: "search-dark",
    name: "Search Dark",
    category: "search",
    isNew: true,
    placeholder: "Search...",
    css: `padding: 12px 16px 12px 44px;
border-radius: 12px;
border: 1px solid rgba(255, 255, 255, 0.1);
background: rgba(255, 255, 255, 0.05);
color: #ffffff;
font-size: 14px;
outline: none;
transition: all 0.2s ease;`,
    tailwind: `pl-11 pr-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/50 text-sm outline-none focus:bg-white/10 focus:border-white/20 transition-all`,
  },
];

export const inputCategories: { id: InputCategory; label: string; emoji: string }[] = [
  { id: "all", label: "All", emoji: "✨" },
  { id: "default", label: "Default", emoji: "📝" },
  { id: "outlined", label: "Outlined", emoji: "⭕" },
  { id: "filled", label: "Filled", emoji: "🔲" },
  { id: "floating", label: "Floating", emoji: "🏷️" },
  { id: "underlined", label: "Underlined", emoji: "➖" },
  { id: "search", label: "Search", emoji: "🔍" },
];

