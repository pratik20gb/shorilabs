export type ButtonCategory = "all" | "primary" | "secondary" | "outline" | "ghost" | "animated" | "3d" | "neon";

export interface Button {
  id: string;
  name: string;
  category: ButtonCategory;
  css: string;
  tailwind: string;
  isNew?: boolean;
  label?: string; // Button text for preview
}

export const buttons: Button[] = [
  // PRIMARY BUTTONS
  {
    id: "primary-solid",
    name: "Primary Solid",
    category: "primary",
    label: "Click Me",
    css: `background: #3b82f6;
color: #ffffff;
padding: 12px 24px;
border-radius: 8px;
font-weight: 600;
border: none;
cursor: pointer;
transition: background 0.2s ease;`,
    tailwind: `bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors`,
  },
  {
    id: "primary-gradient",
    name: "Primary Gradient",
    category: "primary",
    isNew: true,
    label: "Get Started",
    css: `background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
color: #ffffff;
padding: 12px 28px;
border-radius: 8px;
font-weight: 600;
border: none;
cursor: pointer;
transition: transform 0.2s ease, box-shadow 0.2s ease;`,
    tailwind: `bg-gradient-to-br from-indigo-500 to-purple-600 text-white px-7 py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all`,
  },
  {
    id: "primary-rounded",
    name: "Primary Rounded",
    category: "primary",
    label: "Subscribe",
    css: `background: #10b981;
color: #ffffff;
padding: 12px 32px;
border-radius: 9999px;
font-weight: 600;
border: none;
cursor: pointer;
transition: background 0.2s ease;`,
    tailwind: `bg-emerald-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-emerald-600 transition-colors`,
  },
  {
    id: "primary-dark",
    name: "Primary Dark",
    category: "primary",
    label: "Continue",
    css: `background: #1f2937;
color: #ffffff;
padding: 12px 24px;
border-radius: 8px;
font-weight: 600;
border: none;
cursor: pointer;
transition: background 0.2s ease;`,
    tailwind: `bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors`,
  },

  // SECONDARY BUTTONS
  {
    id: "secondary-light",
    name: "Secondary Light",
    category: "secondary",
    label: "Learn More",
    css: `background: #f3f4f6;
color: #374151;
padding: 12px 24px;
border-radius: 8px;
font-weight: 500;
border: none;
cursor: pointer;
transition: background 0.2s ease;`,
    tailwind: `bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors`,
  },
  {
    id: "secondary-muted",
    name: "Secondary Muted",
    category: "secondary",
    label: "View Details",
    css: `background: #e5e7eb;
color: #4b5563;
padding: 10px 20px;
border-radius: 6px;
font-weight: 500;
border: none;
cursor: pointer;
transition: background 0.2s ease;`,
    tailwind: `bg-gray-200 text-gray-600 px-5 py-2.5 rounded-md font-medium hover:bg-gray-300 transition-colors`,
  },
  {
    id: "secondary-soft",
    name: "Secondary Soft",
    category: "secondary",
    isNew: true,
    label: "Explore",
    css: `background: #dbeafe;
color: #1d4ed8;
padding: 12px 24px;
border-radius: 8px;
font-weight: 500;
border: none;
cursor: pointer;
transition: background 0.2s ease;`,
    tailwind: `bg-blue-100 text-blue-700 px-6 py-3 rounded-lg font-medium hover:bg-blue-200 transition-colors`,
  },

  // OUTLINE BUTTONS
  {
    id: "outline-default",
    name: "Outline Default",
    category: "outline",
    label: "Cancel",
    css: `background: transparent;
color: #374151;
padding: 12px 24px;
border-radius: 8px;
font-weight: 500;
border: 2px solid #d1d5db;
cursor: pointer;
transition: all 0.2s ease;`,
    tailwind: `bg-transparent text-gray-700 px-6 py-3 rounded-lg font-medium border-2 border-gray-300 hover:bg-gray-100 transition-all`,
  },
  {
    id: "outline-primary",
    name: "Outline Primary",
    category: "outline",
    label: "Sign Up",
    css: `background: transparent;
color: #3b82f6;
padding: 12px 24px;
border-radius: 8px;
font-weight: 600;
border: 2px solid #3b82f6;
cursor: pointer;
transition: all 0.2s ease;`,
    tailwind: `bg-transparent text-blue-500 px-6 py-3 rounded-lg font-semibold border-2 border-blue-500 hover:bg-blue-500 hover:text-white transition-all`,
  },
  {
    id: "outline-gradient",
    name: "Outline Gradient",
    category: "outline",
    isNew: true,
    label: "Join Now",
    css: `background: transparent;
color: #8b5cf6;
padding: 12px 24px;
border-radius: 8px;
font-weight: 600;
border: 2px solid transparent;
background-image: linear-gradient(#ffffff, #ffffff), linear-gradient(135deg, #8b5cf6, #ec4899);
background-origin: border-box;
background-clip: padding-box, border-box;
cursor: pointer;
transition: all 0.2s ease;`,
    tailwind: `bg-transparent text-violet-500 px-6 py-3 rounded-lg font-semibold border-2 border-transparent bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text hover:opacity-80 transition-all`,
  },
  {
    id: "outline-dark",
    name: "Outline Dark",
    category: "outline",
    label: "Download",
    css: `background: transparent;
color: #1f2937;
padding: 12px 24px;
border-radius: 8px;
font-weight: 600;
border: 2px solid #1f2937;
cursor: pointer;
transition: all 0.2s ease;`,
    tailwind: `bg-transparent text-gray-800 px-6 py-3 rounded-lg font-semibold border-2 border-gray-800 hover:bg-gray-800 hover:text-white transition-all`,
  },

  // GHOST BUTTONS
  {
    id: "ghost-default",
    name: "Ghost Default",
    category: "ghost",
    label: "Skip",
    css: `background: transparent;
color: #6b7280;
padding: 12px 24px;
border-radius: 8px;
font-weight: 500;
border: none;
cursor: pointer;
transition: background 0.2s ease;`,
    tailwind: `bg-transparent text-gray-500 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors`,
  },
  {
    id: "ghost-primary",
    name: "Ghost Primary",
    category: "ghost",
    label: "View All",
    css: `background: transparent;
color: #3b82f6;
padding: 12px 24px;
border-radius: 8px;
font-weight: 500;
border: none;
cursor: pointer;
transition: background 0.2s ease;`,
    tailwind: `bg-transparent text-blue-500 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors`,
  },
  {
    id: "ghost-underline",
    name: "Ghost Underline",
    category: "ghost",
    label: "Read More",
    css: `background: transparent;
color: #374151;
padding: 8px 4px;
border-radius: 0;
font-weight: 500;
border: none;
border-bottom: 2px solid transparent;
cursor: pointer;
transition: border-color 0.2s ease;`,
    tailwind: `bg-transparent text-gray-700 px-1 py-2 font-medium border-b-2 border-transparent hover:border-gray-700 transition-colors`,
  },

  // ANIMATED BUTTONS
  {
    id: "animated-pulse",
    name: "Animated Pulse",
    category: "animated",
    isNew: true,
    label: "Notify Me",
    css: `background: #ef4444;
color: #ffffff;
padding: 12px 24px;
border-radius: 8px;
font-weight: 600;
border: none;
cursor: pointer;
animation: pulse 2s infinite;
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}`,
    tailwind: `bg-red-500 text-white px-6 py-3 rounded-lg font-semibold animate-pulse hover:bg-red-600 transition-colors`,
  },
  {
    id: "animated-bounce",
    name: "Animated Bounce",
    category: "animated",
    label: "Jump In",
    css: `background: #f59e0b;
color: #ffffff;
padding: 12px 24px;
border-radius: 8px;
font-weight: 600;
border: none;
cursor: pointer;
animation: bounce 1s infinite;
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}`,
    tailwind: `bg-amber-500 text-white px-6 py-3 rounded-lg font-semibold animate-bounce hover:bg-amber-600 transition-colors`,
  },
  {
    id: "animated-shimmer",
    name: "Animated Shimmer",
    category: "animated",
    isNew: true,
    label: "Discover",
    css: `background: linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #3b82f6 100%);
background-size: 200% 100%;
color: #ffffff;
padding: 12px 28px;
border-radius: 8px;
font-weight: 600;
border: none;
cursor: pointer;
animation: shimmer 2s linear infinite;
@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}`,
    tailwind: `bg-gradient-to-r from-blue-500 via-violet-500 to-blue-500 bg-[length:200%_100%] text-white px-7 py-3 rounded-lg font-semibold animate-[shimmer_2s_linear_infinite]`,
  },
  {
    id: "animated-slide",
    name: "Animated Slide",
    category: "animated",
    label: "Slide Right",
    css: `background: #10b981;
color: #ffffff;
padding: 12px 24px;
border-radius: 8px;
font-weight: 600;
border: none;
cursor: pointer;
position: relative;
overflow: hidden;
transition: color 0.3s ease;`,
    tailwind: `bg-emerald-500 text-white px-6 py-3 rounded-lg font-semibold relative overflow-hidden group hover:bg-emerald-600 transition-colors`,
  },
  {
    id: "animated-glow",
    name: "Animated Glow",
    category: "animated",
    isNew: true,
    label: "Glow Up",
    css: `background: #8b5cf6;
color: #ffffff;
padding: 12px 28px;
border-radius: 8px;
font-weight: 600;
border: none;
cursor: pointer;
box-shadow: 0 0 20px rgba(139, 92, 246, 0.5);
animation: glow 2s ease-in-out infinite;
@keyframes glow {
  0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.5); }
  50% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.8); }
}`,
    tailwind: `bg-violet-500 text-white px-7 py-3 rounded-lg font-semibold shadow-[0_0_20px_rgba(139,92,246,0.5)] animate-[glow_2s_ease-in-out_infinite]`,
  },

  // 3D BUTTONS
  {
    id: "3d-push",
    name: "3D Push",
    category: "3d",
    label: "Press Me",
    css: `background: #3b82f6;
color: #ffffff;
padding: 12px 24px;
border-radius: 8px;
font-weight: 600;
border: none;
cursor: pointer;
box-shadow: 0 6px 0 #1d4ed8;
transform: translateY(0);
transition: all 0.1s ease;`,
    tailwind: `bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold shadow-[0_6px_0_#1d4ed8] hover:translate-y-1 hover:shadow-[0_4px_0_#1d4ed8] active:translate-y-1.5 active:shadow-[0_2px_0_#1d4ed8] transition-all`,
  },
  {
    id: "3d-lift",
    name: "3D Lift",
    category: "3d",
    isNew: true,
    label: "Hover Me",
    css: `background: #ffffff;
color: #1f2937;
padding: 12px 24px;
border-radius: 12px;
font-weight: 600;
border: 1px solid #e5e7eb;
cursor: pointer;
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
transition: all 0.2s ease;`,
    tailwind: `bg-white text-gray-800 px-6 py-3 rounded-xl font-semibold border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all`,
  },
  {
    id: "3d-depth",
    name: "3D Depth",
    category: "3d",
    label: "Click Here",
    css: `background: linear-gradient(180deg, #4ade80 0%, #22c55e 100%);
color: #ffffff;
padding: 14px 28px;
border-radius: 10px;
font-weight: 700;
border: none;
cursor: pointer;
box-shadow: 0 8px 0 #15803d, 0 12px 20px rgba(0, 0, 0, 0.2);
transform: translateY(0);
transition: all 0.15s ease;`,
    tailwind: `bg-gradient-to-b from-green-400 to-green-500 text-white px-7 py-3.5 rounded-[10px] font-bold shadow-[0_8px_0_#15803d,0_12px_20px_rgba(0,0,0,0.2)] hover:translate-y-1 hover:shadow-[0_6px_0_#15803d,0_10px_16px_rgba(0,0,0,0.2)] active:translate-y-2 active:shadow-[0_4px_0_#15803d] transition-all`,
  },
  {
    id: "3d-glass",
    name: "3D Glass",
    category: "3d",
    isNew: true,
    label: "Explore",
    css: `background: rgba(255, 255, 255, 0.1);
color: #ffffff;
padding: 12px 28px;
border-radius: 12px;
font-weight: 600;
border: 1px solid rgba(255, 255, 255, 0.2);
cursor: pointer;
backdrop-filter: blur(10px);
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
transition: all 0.2s ease;`,
    tailwind: `bg-white/10 text-white px-7 py-3 rounded-xl font-semibold border border-white/20 backdrop-blur-lg shadow-lg hover:bg-white/20 hover:shadow-xl transition-all`,
  },

  // NEON BUTTONS
  {
    id: "neon-blue",
    name: "Neon Blue",
    category: "neon",
    isNew: true,
    label: "Cyber",
    css: `background: transparent;
color: #00d4ff;
padding: 12px 28px;
border-radius: 4px;
font-weight: 600;
border: 2px solid #00d4ff;
cursor: pointer;
text-shadow: 0 0 10px #00d4ff;
box-shadow: 0 0 10px #00d4ff, inset 0 0 10px rgba(0, 212, 255, 0.1);
transition: all 0.3s ease;`,
    tailwind: `bg-transparent text-cyan-400 px-7 py-3 rounded font-semibold border-2 border-cyan-400 shadow-[0_0_10px_#00d4ff,inset_0_0_10px_rgba(0,212,255,0.1)] hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_20px_#00d4ff] transition-all`,
  },
  {
    id: "neon-pink",
    name: "Neon Pink",
    category: "neon",
    label: "Party",
    css: `background: transparent;
color: #ff00ff;
padding: 12px 28px;
border-radius: 4px;
font-weight: 600;
border: 2px solid #ff00ff;
cursor: pointer;
text-shadow: 0 0 10px #ff00ff;
box-shadow: 0 0 10px #ff00ff, inset 0 0 10px rgba(255, 0, 255, 0.1);
transition: all 0.3s ease;`,
    tailwind: `bg-transparent text-fuchsia-500 px-7 py-3 rounded font-semibold border-2 border-fuchsia-500 shadow-[0_0_10px_#ff00ff,inset_0_0_10px_rgba(255,0,255,0.1)] hover:bg-fuchsia-500 hover:text-white hover:shadow-[0_0_20px_#ff00ff] transition-all`,
  },
  {
    id: "neon-green",
    name: "Neon Green",
    category: "neon",
    isNew: true,
    label: "Matrix",
    css: `background: transparent;
color: #00ff41;
padding: 12px 28px;
border-radius: 4px;
font-weight: 600;
font-family: monospace;
border: 2px solid #00ff41;
cursor: pointer;
text-shadow: 0 0 10px #00ff41;
box-shadow: 0 0 10px #00ff41, inset 0 0 10px rgba(0, 255, 65, 0.1);
transition: all 0.3s ease;`,
    tailwind: `bg-transparent text-green-400 px-7 py-3 rounded font-semibold font-mono border-2 border-green-400 shadow-[0_0_10px_#00ff41,inset_0_0_10px_rgba(0,255,65,0.1)] hover:bg-green-400 hover:text-black hover:shadow-[0_0_20px_#00ff41] transition-all`,
  },
  {
    id: "neon-orange",
    name: "Neon Orange",
    category: "neon",
    label: "Fire",
    css: `background: transparent;
color: #ff6600;
padding: 12px 28px;
border-radius: 4px;
font-weight: 600;
border: 2px solid #ff6600;
cursor: pointer;
text-shadow: 0 0 10px #ff6600;
box-shadow: 0 0 10px #ff6600, inset 0 0 10px rgba(255, 102, 0, 0.1);
transition: all 0.3s ease;`,
    tailwind: `bg-transparent text-orange-500 px-7 py-3 rounded font-semibold border-2 border-orange-500 shadow-[0_0_10px_#ff6600,inset_0_0_10px_rgba(255,102,0,0.1)] hover:bg-orange-500 hover:text-white hover:shadow-[0_0_20px_#ff6600] transition-all`,
  },
  {
    id: "neon-purple",
    name: "Neon Purple",
    category: "neon",
    isNew: true,
    label: "Vibe",
    css: `background: transparent;
color: #a855f7;
padding: 12px 28px;
border-radius: 4px;
font-weight: 600;
border: 2px solid #a855f7;
cursor: pointer;
text-shadow: 0 0 10px #a855f7;
box-shadow: 0 0 10px #a855f7, inset 0 0 10px rgba(168, 85, 247, 0.1);
transition: all 0.3s ease;`,
    tailwind: `bg-transparent text-purple-500 px-7 py-3 rounded font-semibold border-2 border-purple-500 shadow-[0_0_10px_#a855f7,inset_0_0_10px_rgba(168,85,247,0.1)] hover:bg-purple-500 hover:text-white hover:shadow-[0_0_20px_#a855f7] transition-all`,
  },
  {
    id: "neon-dual",
    name: "Neon Dual",
    category: "neon",
    isNew: true,
    label: "Synth",
    css: `background: transparent;
color: #ffffff;
padding: 12px 28px;
border-radius: 4px;
font-weight: 600;
border: 2px solid transparent;
border-image: linear-gradient(90deg, #00d4ff, #ff00ff) 1;
cursor: pointer;
text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
box-shadow: 0 0 15px rgba(0, 212, 255, 0.5), 0 0 15px rgba(255, 0, 255, 0.5);
transition: all 0.3s ease;`,
    tailwind: `bg-transparent text-white px-7 py-3 rounded font-semibold border-2 border-transparent bg-gradient-to-r from-cyan-400 to-fuchsia-500 shadow-[0_0_15px_rgba(0,212,255,0.5),0_0_15px_rgba(255,0,255,0.5)] hover:shadow-[0_0_25px_rgba(0,212,255,0.7),0_0_25px_rgba(255,0,255,0.7)] transition-all`,
  },
];

export const buttonCategories: { id: ButtonCategory; label: string; emoji: string }[] = [
  { id: "all", label: "All", emoji: "✨" },
  { id: "primary", label: "Primary", emoji: "🔵" },
  { id: "secondary", label: "Secondary", emoji: "⚪" },
  { id: "outline", label: "Outline", emoji: "⭕" },
  { id: "ghost", label: "Ghost", emoji: "👻" },
  { id: "animated", label: "Animated", emoji: "🎬" },
  { id: "3d", label: "3D", emoji: "📦" },
  { id: "neon", label: "Neon", emoji: "💡" },
];

