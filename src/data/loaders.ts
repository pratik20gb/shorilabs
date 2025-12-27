export type LoaderCategory = "all" | "spinner" | "dots" | "bars" | "pulse" | "skeleton" | "progress";

export interface Loader {
  id: string;
  name: string;
  category: LoaderCategory;
  css: string;
  tailwind: string;
  isNew?: boolean;
}

export const loaders: Loader[] = [
  // SPINNERS
  {
    id: "spinner-basic",
    name: "Spinner Basic",
    category: "spinner",
    css: `width: 24px;
height: 24px;
border: 2px solid #e5e7eb;
border-top-color: #3b82f6;
border-radius: 50%;
animation: spin 0.8s linear infinite;

@keyframes spin {
  to { transform: rotate(360deg); }
}`,
    tailwind: `w-6 h-6 border-2 border-gray-200 border-t-blue-500 rounded-full animate-spin`,
  },
  {
    id: "spinner-thick",
    name: "Spinner Thick",
    category: "spinner",
    css: `width: 32px;
height: 32px;
border: 4px solid #e5e7eb;
border-top-color: #6366f1;
border-radius: 50%;
animation: spin 0.8s linear infinite;`,
    tailwind: `w-8 h-8 border-4 border-gray-200 border-t-indigo-500 rounded-full animate-spin`,
  },
  {
    id: "spinner-dual",
    name: "Spinner Dual",
    category: "spinner",
    isNew: true,
    css: `width: 28px;
height: 28px;
border: 3px solid transparent;
border-top-color: #3b82f6;
border-bottom-color: #3b82f6;
border-radius: 50%;
animation: spin 0.8s linear infinite;`,
    tailwind: `w-7 h-7 border-[3px] border-transparent border-t-blue-500 border-b-blue-500 rounded-full animate-spin`,
  },
  {
    id: "spinner-gradient",
    name: "Spinner Gradient",
    category: "spinner",
    isNew: true,
    css: `width: 32px;
height: 32px;
border: 3px solid transparent;
border-radius: 50%;
background: linear-gradient(#fff, #fff) padding-box, linear-gradient(135deg, #667eea, #764ba2) border-box;
animation: spin 1s linear infinite;`,
    tailwind: `w-8 h-8 border-[3px] border-transparent rounded-full [background:linear-gradient(white,white)_padding-box,linear-gradient(135deg,#667eea,#764ba2)_border-box] animate-spin`,
  },

  // DOTS
  {
    id: "dots-bounce",
    name: "Dots Bounce",
    category: "dots",
    css: `display: flex;
gap: 4px;

.dot {
  width: 8px;
  height: 8px;
  background: #3b82f6;
  border-radius: 50%;
  animation: bounce 0.6s infinite alternate;
}
.dot:nth-child(2) { animation-delay: 0.2s; }
.dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes bounce {
  to { transform: translateY(-8px); }
}`,
    tailwind: `flex gap-1 [&>*]:w-2 [&>*]:h-2 [&>*]:bg-blue-500 [&>*]:rounded-full [&>*]:animate-bounce [&>*:nth-child(2)]:animation-delay-200 [&>*:nth-child(3)]:animation-delay-400`,
  },
  {
    id: "dots-pulse",
    name: "Dots Pulse",
    category: "dots",
    css: `display: flex;
gap: 6px;

.dot {
  width: 10px;
  height: 10px;
  background: #6366f1;
  border-radius: 50%;
  animation: pulse 1.4s ease-in-out infinite;
}
.dot:nth-child(2) { animation-delay: 0.2s; }
.dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes pulse {
  0%, 100% { transform: scale(0.8); opacity: 0.5; }
  50% { transform: scale(1); opacity: 1; }
}`,
    tailwind: `flex gap-1.5 [&>*]:w-2.5 [&>*]:h-2.5 [&>*]:bg-indigo-500 [&>*]:rounded-full [&>*]:animate-pulse`,
  },
  {
    id: "dots-wave",
    name: "Dots Wave",
    category: "dots",
    isNew: true,
    css: `display: flex;
gap: 4px;

.dot {
  width: 8px;
  height: 8px;
  background: #10b981;
  border-radius: 50%;
  animation: wave 1s ease-in-out infinite;
}
.dot:nth-child(1) { animation-delay: 0s; }
.dot:nth-child(2) { animation-delay: 0.1s; }
.dot:nth-child(3) { animation-delay: 0.2s; }
.dot:nth-child(4) { animation-delay: 0.3s; }

@keyframes wave {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}`,
    tailwind: `flex gap-1 [&>*]:w-2 [&>*]:h-2 [&>*]:bg-emerald-500 [&>*]:rounded-full [&>*]:animate-bounce`,
  },

  // BARS
  {
    id: "bars-loading",
    name: "Bars Loading",
    category: "bars",
    css: `display: flex;
gap: 3px;

.bar {
  width: 4px;
  height: 20px;
  background: #3b82f6;
  border-radius: 2px;
  animation: bars 1s ease-in-out infinite;
}
.bar:nth-child(2) { animation-delay: 0.1s; }
.bar:nth-child(3) { animation-delay: 0.2s; }
.bar:nth-child(4) { animation-delay: 0.3s; }

@keyframes bars {
  0%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(0.5); }
}`,
    tailwind: `flex gap-0.5 [&>*]:w-1 [&>*]:h-5 [&>*]:bg-blue-500 [&>*]:rounded-sm [&>*]:animate-pulse`,
  },
  {
    id: "bars-equalizer",
    name: "Bars Equalizer",
    category: "bars",
    isNew: true,
    css: `display: flex;
gap: 3px;
align-items: flex-end;

.bar {
  width: 4px;
  background: #8b5cf6;
  border-radius: 2px;
  animation: equalizer 0.8s ease-in-out infinite;
}
.bar:nth-child(1) { height: 12px; animation-delay: 0s; }
.bar:nth-child(2) { height: 20px; animation-delay: 0.15s; }
.bar:nth-child(3) { height: 16px; animation-delay: 0.3s; }
.bar:nth-child(4) { height: 24px; animation-delay: 0.45s; }

@keyframes equalizer {
  0%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(0.4); }
}`,
    tailwind: `flex gap-0.5 items-end [&>*]:w-1 [&>*]:bg-violet-500 [&>*]:rounded-sm [&>*]:animate-pulse`,
  },

  // PULSE
  {
    id: "pulse-ring",
    name: "Pulse Ring",
    category: "pulse",
    css: `width: 24px;
height: 24px;
border-radius: 50%;
background: #3b82f6;
position: relative;

&::before {
  content: '';
  position: absolute;
  inset: -4px;
  border: 2px solid #3b82f6;
  border-radius: 50%;
  animation: pulse-ring 1.5s ease-out infinite;
}

@keyframes pulse-ring {
  0% { transform: scale(0.8); opacity: 1; }
  100% { transform: scale(1.5); opacity: 0; }
}`,
    tailwind: `w-6 h-6 rounded-full bg-blue-500 relative before:absolute before:-inset-1 before:border-2 before:border-blue-500 before:rounded-full before:animate-ping`,
  },
  {
    id: "pulse-dot",
    name: "Pulse Dot",
    category: "pulse",
    css: `width: 12px;
height: 12px;
border-radius: 50%;
background: #10b981;
animation: pulse-dot 1.5s ease-in-out infinite;

@keyframes pulse-dot {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.7; }
}`,
    tailwind: `w-3 h-3 rounded-full bg-emerald-500 animate-pulse`,
  },
  {
    id: "pulse-glow",
    name: "Pulse Glow",
    category: "pulse",
    isNew: true,
    css: `width: 20px;
height: 20px;
border-radius: 50%;
background: #8b5cf6;
box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.7);
animation: pulse-glow 1.5s infinite;

@keyframes pulse-glow {
  0% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.7); }
  70% { box-shadow: 0 0 0 15px rgba(139, 92, 246, 0); }
  100% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0); }
}`,
    tailwind: `w-5 h-5 rounded-full bg-violet-500 animate-ping`,
  },

  // SKELETON
  {
    id: "skeleton-line",
    name: "Skeleton Line",
    category: "skeleton",
    css: `height: 16px;
width: 100%;
background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
background-size: 200% 100%;
border-radius: 4px;
animation: shimmer 1.5s infinite;

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}`,
    tailwind: `h-4 w-full bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%] rounded animate-pulse`,
  },
  {
    id: "skeleton-circle",
    name: "Skeleton Circle",
    category: "skeleton",
    css: `width: 48px;
height: 48px;
background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
background-size: 200% 100%;
border-radius: 50%;
animation: shimmer 1.5s infinite;`,
    tailwind: `w-12 h-12 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%] rounded-full animate-pulse`,
  },
  {
    id: "skeleton-card",
    name: "Skeleton Card",
    category: "skeleton",
    isNew: true,
    css: `width: 100%;
height: 120px;
background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
background-size: 200% 100%;
border-radius: 12px;
animation: shimmer 1.5s infinite;`,
    tailwind: `w-full h-[120px] bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%] rounded-xl animate-pulse`,
  },

  // PROGRESS
  {
    id: "progress-bar",
    name: "Progress Bar",
    category: "progress",
    css: `width: 100%;
height: 6px;
background: #e5e7eb;
border-radius: 9999px;
overflow: hidden;

.fill {
  height: 100%;
  width: 60%;
  background: #3b82f6;
  border-radius: 9999px;
  animation: progress 2s ease-in-out infinite;
}

@keyframes progress {
  0% { width: 0%; }
  50% { width: 70%; }
  100% { width: 100%; }
}`,
    tailwind: `w-full h-1.5 bg-gray-200 rounded-full overflow-hidden [&>*]:h-full [&>*]:bg-blue-500 [&>*]:rounded-full [&>*]:animate-pulse`,
  },
  {
    id: "progress-indeterminate",
    name: "Progress Indeterminate",
    category: "progress",
    isNew: true,
    css: `width: 100%;
height: 4px;
background: #e5e7eb;
border-radius: 9999px;
overflow: hidden;
position: relative;

&::after {
  content: '';
  position: absolute;
  height: 100%;
  width: 40%;
  background: linear-gradient(90deg, transparent, #3b82f6, transparent);
  animation: indeterminate 1.5s infinite;
}

@keyframes indeterminate {
  0% { left: -40%; }
  100% { left: 100%; }
}`,
    tailwind: `w-full h-1 bg-gray-200 rounded-full overflow-hidden relative after:absolute after:h-full after:w-2/5 after:bg-gradient-to-r after:from-transparent after:via-blue-500 after:to-transparent after:animate-[indeterminate_1.5s_infinite]`,
  },
  {
    id: "progress-circular",
    name: "Progress Circular",
    category: "progress",
    css: `width: 40px;
height: 40px;
border-radius: 50%;
background: conic-gradient(#3b82f6 70%, #e5e7eb 70%);
display: flex;
align-items: center;
justify-content: center;

&::before {
  content: '';
  width: 30px;
  height: 30px;
  background: white;
  border-radius: 50%;
}`,
    tailwind: `w-10 h-10 rounded-full bg-[conic-gradient(#3b82f6_70%,#e5e7eb_70%)] flex items-center justify-center before:w-[30px] before:h-[30px] before:bg-white before:rounded-full`,
  },
];

export const loaderCategories: { id: LoaderCategory; label: string; emoji: string }[] = [
  { id: "all", label: "All", emoji: "✨" },
  { id: "spinner", label: "Spinner", emoji: "🔄" },
  { id: "dots", label: "Dots", emoji: "⚪" },
  { id: "bars", label: "Bars", emoji: "📊" },
  { id: "pulse", label: "Pulse", emoji: "💓" },
  { id: "skeleton", label: "Skeleton", emoji: "🦴" },
  { id: "progress", label: "Progress", emoji: "📈" },
];

