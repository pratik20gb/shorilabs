export type PatternCategory = "all" | "gradients" | "geometric" | "decorative" | "effects";

export interface Pattern {
  id: string;
  name: string;
  category: PatternCategory;
  css: string;
  tailwind: string;
  isNew?: boolean;
}

export const patterns: Pattern[] = [
  // GRADIENTS
  {
    id: "aurora-glow",
    name: "Aurora Glow",
    category: "gradients",
    isNew: true,
    css: `background: linear-gradient(125deg, #0a0a0a 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #0a0a0a 100%);`,
    tailwind: `bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] via-[#16213e] to-[#0f3460]`,
  },
  {
    id: "cyber-sunset",
    name: "Cyber Sunset",
    category: "gradients",
    isNew: true,
    css: `background: linear-gradient(180deg, #0f0c29 0%, #302b63 50%, #24243e 100%);`,
    tailwind: `bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e]`,
  },
  {
    id: "neon-horizon",
    name: "Neon Horizon",
    category: "gradients",
    css: `background: radial-gradient(ellipse at bottom, #00d4ff20 0%, transparent 60%), linear-gradient(180deg, #0a0a0a 0%, #1a1a2e 100%);`,
    tailwind: `bg-[radial-gradient(ellipse_at_bottom,#00d4ff20_0%,transparent_60%),linear-gradient(180deg,#0a0a0a_0%,#1a1a2e_100%)]`,
  },
  {
    id: "purple-haze",
    name: "Purple Haze",
    category: "gradients",
    css: `background: radial-gradient(ellipse at top, #a855f730 0%, transparent 50%), #0a0a0f;`,
    tailwind: `bg-[radial-gradient(ellipse_at_top,#a855f730_0%,transparent_50%),#0a0a0f]`,
  },
  {
    id: "ocean-depth",
    name: "Ocean Depth",
    category: "gradients",
    css: `background: linear-gradient(135deg, #0c1015 0%, #1a3a4a 50%, #0c2635 100%);`,
    tailwind: `bg-gradient-to-br from-[#0c1015] via-[#1a3a4a] to-[#0c2635]`,
  },
  {
    id: "emerald-void",
    name: "Emerald Void",
    category: "gradients",
    css: `background: radial-gradient(circle at 30% 70%, #10b98120 0%, transparent 40%), radial-gradient(circle at 70% 30%, #06b6d420 0%, transparent 40%), #0a0a0f;`,
    tailwind: `bg-[radial-gradient(circle_at_30%_70%,#10b98120_0%,transparent_40%),radial-gradient(circle_at_70%_30%,#06b6d420_0%,transparent_40%),#0a0a0f]`,
  },
  {
    id: "rose-gold",
    name: "Rose Gold",
    category: "gradients",
    css: `background: linear-gradient(135deg, #1a1a1a 0%, #2d1f2d 50%, #1a1a1a 100%);`,
    tailwind: `bg-gradient-to-br from-[#1a1a1a] via-[#2d1f2d] to-[#1a1a1a]`,
  },
  {
    id: "midnight-sun",
    name: "Midnight Sun",
    category: "gradients",
    isNew: true,
    css: `background: radial-gradient(ellipse at bottom, #f59e0b15 0%, transparent 50%), linear-gradient(180deg, #0a0a0f 0%, #1a1510 100%);`,
    tailwind: `bg-[radial-gradient(ellipse_at_bottom,#f59e0b15_0%,transparent_50%),linear-gradient(180deg,#0a0a0f_0%,#1a1510_100%)]`,
  },

  // GEOMETRIC
  {
    id: "grid-fade",
    name: "Grid Fade",
    category: "geometric",
    css: `background-color: #fafafa;
background-image: linear-gradient(#00000015 1px, transparent 1px), linear-gradient(90deg, #00000015 1px, transparent 1px);
background-size: 50px 50px;`,
    tailwind: `bg-[#fafafa] bg-[linear-gradient(#00000015_1px,transparent_1px),linear-gradient(90deg,#00000015_1px,transparent_1px)] bg-[size:50px_50px]`,
  },
  {
    id: "dot-matrix",
    name: "Dot Matrix",
    category: "geometric",
    isNew: true,
    css: `background-color: #fafafa;
background-image: radial-gradient(#00000020 1px, transparent 1px);
background-size: 20px 20px;`,
    tailwind: `bg-[#fafafa] bg-[radial-gradient(#00000020_1px,transparent_1px)] bg-[size:20px_20px]`,
  },
  {
    id: "hexagon-mesh",
    name: "Hexagon Mesh",
    category: "geometric",
    css: `background-color: #fafafa;
background-image: 
  linear-gradient(30deg, #00000012 12%, transparent 12.5%, transparent 87%, #00000012 87.5%, #00000012),
  linear-gradient(150deg, #00000012 12%, transparent 12.5%, transparent 87%, #00000012 87.5%, #00000012),
  linear-gradient(30deg, #00000012 12%, transparent 12.5%, transparent 87%, #00000012 87.5%, #00000012),
  linear-gradient(150deg, #00000012 12%, transparent 12.5%, transparent 87%, #00000012 87.5%, #00000012);
background-size: 80px 140px;
background-position: 0 0, 0 0, 40px 70px, 40px 70px;`,
    tailwind: `bg-[#fafafa]`,
  },
  {
    id: "diagonal-lines",
    name: "Diagonal Lines",
    category: "geometric",
    css: `background-color: #fafafa;
background-image: repeating-linear-gradient(45deg, #00000012 0, #00000012 1px, transparent 0, transparent 50%);
background-size: 20px 20px;`,
    tailwind: `bg-[#fafafa] bg-[repeating-linear-gradient(45deg,#00000012_0,#00000012_1px,transparent_0,transparent_50%)] bg-[size:20px_20px]`,
  },
  {
    id: "cross-pattern",
    name: "Cross Pattern",
    category: "geometric",
    css: `background-color: #fafafa;
background-image: 
  linear-gradient(#00000015 2px, transparent 2px),
  linear-gradient(90deg, #00000015 2px, transparent 2px);
background-size: 40px 40px;
background-position: -1px -1px;`,
    tailwind: `bg-[#fafafa] bg-[linear-gradient(#00000015_2px,transparent_2px),linear-gradient(90deg,#00000015_2px,transparent_2px)] bg-[size:40px_40px]`,
  },
  {
    id: "triangle-mosaic",
    name: "Triangle Mosaic",
    category: "geometric",
    isNew: true,
    css: `background-color: #fafafa;
background-image: 
  linear-gradient(45deg, #00000012 25%, transparent 25%),
  linear-gradient(-45deg, #00000012 25%, transparent 25%),
  linear-gradient(45deg, transparent 75%, #00000012 75%),
  linear-gradient(-45deg, transparent 75%, #00000012 75%);
background-size: 60px 60px;
background-position: 0 0, 30px 0, 30px -30px, 0px 30px;`,
    tailwind: `bg-[#fafafa]`,
  },
  {
    id: "isometric-cubes",
    name: "Isometric Cubes",
    category: "geometric",
    css: `background-color: #fafafa;
background-image: 
  linear-gradient(30deg, #00000015 12%, transparent 12.5%, transparent 87%, #00000015 87.5%, #00000015),
  linear-gradient(150deg, #00000015 12%, transparent 12.5%, transparent 87%, #00000015 87.5%, #00000015),
  linear-gradient(30deg, #00000015 12%, transparent 12.5%, transparent 87%, #00000015 87.5%, #00000015),
  linear-gradient(150deg, #00000015 12%, transparent 12.5%, transparent 87%, #00000015 87.5%, #00000015),
  linear-gradient(60deg, #00000010 25%, transparent 25.5%, transparent 75%, #00000010 75%, #00000010),
  linear-gradient(60deg, #00000010 25%, transparent 25.5%, transparent 75%, #00000010 75%, #00000010);
background-size: 80px 140px;
background-position: 0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px;`,
    tailwind: `bg-[#fafafa]`,
  },

  // DECORATIVE
  {
    id: "noise-texture",
    name: "Noise Texture",
    category: "decorative",
    css: `background-color: #0a0a0f;
background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
background-blend-mode: overlay;
opacity: 0.15;`,
    tailwind: `bg-[#0a0a0f]`,
  },
  {
    id: "spotlight",
    name: "Spotlight",
    category: "decorative",
    isNew: true,
    css: `background: radial-gradient(circle at 50% 0%, #00d4ff15 0%, transparent 50%), #0a0a0f;`,
    tailwind: `bg-[radial-gradient(circle_at_50%_0%,#00d4ff15_0%,transparent_50%),#0a0a0f]`,
  },
  {
    id: "dual-spotlight",
    name: "Dual Spotlight",
    category: "decorative",
    css: `background: 
  radial-gradient(circle at 20% 20%, #00d4ff10 0%, transparent 40%),
  radial-gradient(circle at 80% 80%, #a855f710 0%, transparent 40%),
  #0a0a0f;`,
    tailwind: `bg-[radial-gradient(circle_at_20%_20%,#00d4ff10_0%,transparent_40%),radial-gradient(circle_at_80%_80%,#a855f710_0%,transparent_40%),#0a0a0f]`,
  },
  {
    id: "corner-glow",
    name: "Corner Glow",
    category: "decorative",
    css: `background: 
  radial-gradient(ellipse at 0% 0%, #00d4ff15 0%, transparent 50%),
  radial-gradient(ellipse at 100% 100%, #a855f715 0%, transparent 50%),
  #0a0a0f;`,
    tailwind: `bg-[radial-gradient(ellipse_at_0%_0%,#00d4ff15_0%,transparent_50%),radial-gradient(ellipse_at_100%_100%,#a855f715_0%,transparent_50%),#0a0a0f]`,
  },
  {
    id: "wave-pattern",
    name: "Wave Pattern",
    category: "decorative",
    css: `background-color: #0a0a0f;
background-image: 
  radial-gradient(ellipse at 50% 50%, #ffffff05 0%, transparent 70%),
  repeating-linear-gradient(
    90deg,
    transparent,
    transparent 100px,
    #ffffff03 100px,
    #ffffff03 200px
  );`,
    tailwind: `bg-[#0a0a0f]`,
  },
  {
    id: "starburst",
    name: "Starburst",
    category: "decorative",
    isNew: true,
    css: `background: 
  conic-gradient(from 0deg at 50% 50%, transparent 0deg, #ffffff05 10deg, transparent 20deg),
  #0a0a0f;`,
    tailwind: `bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,#ffffff05_10deg,transparent_20deg),#0a0a0f]`,
  },

  // EFFECTS
  {
    id: "blur-orbs",
    name: "Blur Orbs",
    category: "effects",
    css: `background: 
  radial-gradient(circle at 30% 30%, #00d4ff20 0%, transparent 30%),
  radial-gradient(circle at 70% 70%, #a855f720 0%, transparent 30%),
  radial-gradient(circle at 50% 50%, #10b98115 0%, transparent 40%),
  #0a0a0f;`,
    tailwind: `bg-[radial-gradient(circle_at_30%_30%,#00d4ff20_0%,transparent_30%),radial-gradient(circle_at_70%_70%,#a855f720_0%,transparent_30%),radial-gradient(circle_at_50%_50%,#10b98115_0%,transparent_40%),#0a0a0f]`,
  },
  {
    id: "glass-morphism",
    name: "Glass Morphism",
    category: "effects",
    isNew: true,
    css: `background: linear-gradient(135deg, #ffffff08 0%, #ffffff02 100%);
backdrop-filter: blur(20px);
border: 1px solid #ffffff10;`,
    tailwind: `bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-[20px] border border-white/10`,
  },
  {
    id: "frosted-glass",
    name: "Frosted Glass",
    category: "effects",
    css: `background: rgba(10, 10, 15, 0.8);
backdrop-filter: blur(10px) saturate(180%);
border: 1px solid rgba(255, 255, 255, 0.1);`,
    tailwind: `bg-[#0a0a0f]/80 backdrop-blur-[10px] backdrop-saturate-[180%] border border-white/10`,
  },
  {
    id: "mesh-gradient",
    name: "Mesh Gradient",
    category: "effects",
    css: `background: 
  radial-gradient(at 40% 20%, #00d4ff20 0px, transparent 50%),
  radial-gradient(at 80% 0%, #a855f720 0px, transparent 50%),
  radial-gradient(at 0% 50%, #10b98120 0px, transparent 50%),
  radial-gradient(at 80% 50%, #f59e0b15 0px, transparent 50%),
  radial-gradient(at 0% 100%, #ec489920 0px, transparent 50%),
  radial-gradient(at 80% 100%, #00d4ff15 0px, transparent 50%),
  #0a0a0f;`,
    tailwind: `bg-[radial-gradient(at_40%_20%,#00d4ff20_0px,transparent_50%),radial-gradient(at_80%_0%,#a855f720_0px,transparent_50%),radial-gradient(at_0%_50%,#10b98120_0px,transparent_50%),radial-gradient(at_80%_50%,#f59e0b15_0px,transparent_50%),radial-gradient(at_0%_100%,#ec489920_0px,transparent_50%),radial-gradient(at_80%_100%,#00d4ff15_0px,transparent_50%),#0a0a0f]`,
  },
  {
    id: "animated-gradient",
    name: "Animated Gradient",
    category: "effects",
    css: `background: linear-gradient(-45deg, #0a0a0f, #1a1a2e, #16213e, #0f3460);
background-size: 400% 400%;
animation: gradientShift 15s ease infinite;

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}`,
    tailwind: `bg-gradient-to-br from-[#0a0a0f] via-[#1a1a2e] via-[#16213e] to-[#0f3460] bg-[length:400%_400%] animate-[gradientShift_15s_ease_infinite]`,
  },
  {
    id: "vignette",
    name: "Vignette",
    category: "effects",
    css: `background: radial-gradient(ellipse at center, #0a0a0f 0%, #000000 100%);`,
    tailwind: `bg-[radial-gradient(ellipse_at_center,#0a0a0f_0%,#000000_100%)]`,
  },
  {
    id: "scanlines",
    name: "Scanlines",
    category: "effects",
    css: `background-color: #0a0a0f;
background-image: repeating-linear-gradient(
  0deg,
  transparent,
  transparent 2px,
  rgba(0, 0, 0, 0.3) 2px,
  rgba(0, 0, 0, 0.3) 4px
);`,
    tailwind: `bg-[#0a0a0f] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.3)_2px,rgba(0,0,0,0.3)_4px)]`,
  },

  // MORE GRADIENTS
  {
    id: "sunset-flame",
    name: "Sunset Flame",
    category: "gradients",
    isNew: true,
    css: `background: linear-gradient(135deg, #1a0a0a 0%, #2d1810 25%, #3d1a0d 50%, #1a0a0a 100%);`,
    tailwind: `bg-gradient-to-br from-[#1a0a0a] via-[#2d1810] via-[#3d1a0d] to-[#1a0a0a]`,
  },
  {
    id: "arctic-blue",
    name: "Arctic Blue",
    category: "gradients",
    isNew: true,
    css: `background: linear-gradient(180deg, #0a1929 0%, #1e3a5f 50%, #0f2744 100%);`,
    tailwind: `bg-gradient-to-b from-[#0a1929] via-[#1e3a5f] to-[#0f2744]`,
  },
  {
    id: "forest-depth",
    name: "Forest Depth",
    category: "gradients",
    css: `background: linear-gradient(135deg, #0a1a0a 0%, #1a3a1a 50%, #0f2a0f 100%);`,
    tailwind: `bg-gradient-to-br from-[#0a1a0a] via-[#1a3a1a] to-[#0f2a0f]`,
  },
  {
    id: "magenta-dream",
    name: "Magenta Dream",
    category: "gradients",
    css: `background: radial-gradient(ellipse at center, #4a1a4a20 0%, transparent 60%), linear-gradient(180deg, #1a0a1a 0%, #2a1a2a 100%);`,
    tailwind: `bg-[radial-gradient(ellipse_at_center,#4a1a4a20_0%,transparent_60%),linear-gradient(180deg,#1a0a1a_0%,#2a1a2a_100%)]`,
  },
  {
    id: "dawn-mist",
    name: "Dawn Mist",
    category: "gradients",
    css: `background: linear-gradient(180deg, #f5e6d3 0%, #e8d5c4 50%, #d4c4b0 100%);`,
    tailwind: `bg-gradient-to-b from-[#f5e6d3] via-[#e8d5c4] to-[#d4c4b0]`,
  },
  {
    id: "crimson-night",
    name: "Crimson Night",
    category: "gradients",
    css: `background: radial-gradient(circle at top right, #4a0a0a20 0%, transparent 50%), #1a0a0f;`,
    tailwind: `bg-[radial-gradient(circle_at_top_right,#4a0a0a20_0%,transparent_50%),#1a0a0f]`,
  },
  {
    id: "mint-fresh",
    name: "Mint Fresh",
    category: "gradients",
    css: `background: linear-gradient(135deg, #0f1f1a 0%, #1a3a2a 50%, #0f2a1f 100%);`,
    tailwind: `bg-gradient-to-br from-[#0f1f1a] via-[#1a3a2a] to-[#0f2a1f]`,
  },
  {
    id: "peach-glow",
    name: "Peach Glow",
    category: "gradients",
    css: `background: radial-gradient(ellipse at bottom left, #3d2a1a15 0%, transparent 60%), #1a1510;`,
    tailwind: `bg-[radial-gradient(ellipse_at_bottom_left,#3d2a1a15_0%,transparent_60%),#1a1510]`,
  },
  {
    id: "electric-teal",
    name: "Electric Teal",
    category: "gradients",
    css: `background: linear-gradient(225deg, #0a1a1a 0%, #1a3a3a 40%, #0d2d2d 100%);`,
    tailwind: `bg-gradient-to-bl from-[#0a1a1a] via-[#1a3a3a] to-[#0d2d2d]`,
  },
  {
    id: "golden-hour",
    name: "Golden Hour",
    category: "gradients",
    css: `background: radial-gradient(circle at bottom, #3d2a0a15 0%, transparent 50%), linear-gradient(180deg, #1a150f 0%, #2a1f15 100%);`,
    tailwind: `bg-[radial-gradient(circle_at_bottom,#3d2a0a15_0%,transparent_50%),linear-gradient(180deg,#1a150f_0%,#2a1f15_100%)]`,
  },
  {
    id: "slate-storm",
    name: "Slate Storm",
    category: "gradients",
    css: `background: linear-gradient(180deg, #1a1a22 0%, #2a2a3a 50%, #1f1f2a 100%);`,
    tailwind: `bg-gradient-to-b from-[#1a1a22] via-[#2a2a3a] to-[#1f1f2a]`,
  },
  {
    id: "lavender-mist",
    name: "Lavender Mist",
    category: "gradients",
    css: `background: radial-gradient(ellipse at top, #6a4a7a15 0%, transparent 60%), #1a1520;`,
    tailwind: `bg-[radial-gradient(ellipse_at_top,#6a4a7a15_0%,transparent_60%),#1a1520]`,
  },

  // MORE GEOMETRIC
  {
    id: "brick-wall",
    name: "Brick Wall",
    category: "geometric",
    isNew: true,
    css: `background-color: #fafafa;
background-image: 
  linear-gradient(#00000015 2px, transparent 2px),
  linear-gradient(90deg, #00000015 2px, transparent 2px);
background-size: 100px 50px;
background-position: 0 0, 50px 25px;`,
    tailwind: `bg-[#fafafa]`,
  },
  {
    id: "zigzag",
    name: "Zigzag",
    category: "geometric",
    isNew: true,
    css: `background-color: #fafafa;
background-image: linear-gradient(135deg, #00000015 25%, transparent 25%), 
  linear-gradient(225deg, #00000015 25%, transparent 25%);
background-size: 40px 40px;`,
    tailwind: `bg-[#fafafa]`,
  },
  {
    id: "plus-pattern",
    name: "Plus Pattern",
    category: "geometric",
    css: `background-color: #fafafa;
background-image: 
  linear-gradient(#00000015 1px, transparent 1px),
  linear-gradient(90deg, #00000015 1px, transparent 1px),
  linear-gradient(#00000010 1px, transparent 1px),
  linear-gradient(90deg, #00000010 1px, transparent 1px);
background-size: 50px 50px, 50px 50px, 10px 10px, 10px 10px;`,
    tailwind: `bg-[#fafafa]`,
  },
  {
    id: "diamond-grid",
    name: "Diamond Grid",
    category: "geometric",
    css: `background-color: #fafafa;
background-image: 
  linear-gradient(45deg, #00000015 25%, transparent 25%, transparent 75%, #00000015 75%),
  linear-gradient(45deg, #00000015 25%, transparent 25%, transparent 75%, #00000015 75%);
background-size: 60px 60px;
background-position: 0 0, 30px 30px;`,
    tailwind: `bg-[#fafafa]`,
  },
  {
    id: "vertical-stripes",
    name: "Vertical Stripes",
    category: "geometric",
    css: `background-color: #fafafa;
background-image: repeating-linear-gradient(90deg, transparent, transparent 40px, #00000008 40px, #00000008 80px);`,
    tailwind: `bg-[#fafafa] bg-[repeating-linear-gradient(90deg,transparent,transparent_40px,#00000008_40px,#00000008_80px)]`,
  },
  {
    id: "wavy-lines",
    name: "Wavy Lines",
    category: "geometric",
    css: `background-color: #fafafa;
background-image: repeating-radial-gradient(circle at 0 0, transparent 0, #fafafa 20px), 
  repeating-linear-gradient(#00000012, #00000008);`,
    tailwind: `bg-[#fafafa]`,
  },
  {
    id: "checkerboard",
    name: "Checkerboard",
    category: "geometric",
    css: `background-color: #fafafa;
background-image: 
  linear-gradient(45deg, #00000012 25%, transparent 25%, transparent 75%, #00000012 75%),
  linear-gradient(45deg, #00000012 25%, transparent 25%, transparent 75%, #00000012 75%);
background-size: 40px 40px;
background-position: 0 0, 20px 20px;`,
    tailwind: `bg-[#fafafa]`,
  },
  {
    id: "circles-pattern",
    name: "Circles Pattern",
    category: "geometric",
    css: `background-color: #fafafa;
background-image: radial-gradient(circle, #00000015 1px, transparent 1px);
background-size: 30px 30px;`,
    tailwind: `bg-[#fafafa] bg-[radial-gradient(circle,#00000015_1px,transparent_1px)] bg-[size:30px_30px]`,
  },
  {
    id: "polka-dots",
    name: "Polka Dots",
    category: "geometric",
    css: `background-color: #fafafa;
background-image: radial-gradient(#00000018 15%, transparent 16%);
background-size: 40px 40px;`,
    tailwind: `bg-[#fafafa] bg-[radial-gradient(#00000018_15%,transparent_16%)] bg-[size:40px_40px]`,
  },
  {
    id: "stairs",
    name: "Stairs",
    category: "geometric",
    css: `background-color: #fafafa;
background-image: 
  linear-gradient(63deg, #00000015 23%, transparent 23%),
  linear-gradient(63deg, transparent 74%, #00000015 74%);
background-size: 50px 50px;`,
    tailwind: `bg-[#fafafa]`,
  },
  {
    id: "arrow-pattern",
    name: "Arrow Pattern",
    category: "geometric",
    css: `background-color: #fafafa;
background-image: 
  linear-gradient(135deg, transparent 25%, #00000012 25%, #00000012 50%, transparent 50%, transparent 75%, #00000012 75%);
background-size: 50px 50px;`,
    tailwind: `bg-[#fafafa]`,
  },
  {
    id: "honeycomb-alt",
    name: "Honeycomb Alt",
    category: "geometric",
    css: `background-color: #fafafa;
background-image: 
  radial-gradient(circle at 50% 100%, transparent 9px, #00000015 9px, #00000015 11px, transparent 11px);
background-size: 40px 35px;`,
    tailwind: `bg-[#fafafa]`,
  },
  {
    id: "dots-tiny",
    name: "Dots Tiny",
    category: "geometric",
    isNew: true,
    css: `background-color: #fafafa;
background-image: radial-gradient(circle, #00000010 0.5px, transparent 0.5px);
background-size: 8px 8px;`,
    tailwind: `bg-[#fafafa]`,
  },
  {
    id: "dots-mega",
    name: "Dots Mega",
    category: "geometric",
    isNew: true,
    css: `background-color: #0a0a0f;
background-image: radial-gradient(circle, #ffffff12 3px, transparent 3px);
background-size: 60px 60px;`,
    tailwind: `bg-[#0a0a0f]`,
  },
  {
    id: "grid-blueprint",
    name: "Grid Blueprint",
    category: "geometric",
    isNew: true,
    css: `background-color: #1a237e;
background-image: 
  linear-gradient(#ffffff20 2px, transparent 2px),
  linear-gradient(90deg, #ffffff20 2px, transparent 2px),
  linear-gradient(#ffffff10 1px, transparent 1px),
  linear-gradient(90deg, #ffffff10 1px, transparent 1px);
background-size: 100px 100px, 100px 100px, 20px 20px, 20px 20px;`,
    tailwind: `bg-[#1a237e]`,
  },
  {
    id: "diagonal-bold",
    name: "Diagonal Bold",
    category: "geometric",
    css: `background-color: #fafafa;
background-image: repeating-linear-gradient(45deg, transparent, transparent 30px, #00000015 30px, #00000015 35px);`,
    tailwind: `bg-[#fafafa]`,
  },
  {
    id: "diagonal-thin",
    name: "Diagonal Thin",
    category: "geometric",
    css: `background-color: #0a0a0f;
background-image: repeating-linear-gradient(-45deg, transparent, transparent 15px, #ffffff08 15px, #ffffff08 16px);`,
    tailwind: `bg-[#0a0a0f]`,
  },
  {
    id: "circles-stacked",
    name: "Circles Stacked",
    category: "geometric",
    css: `background-color: #fafafa;
background-image: 
  radial-gradient(circle, #00000012 25%, transparent 25%),
  radial-gradient(circle, #00000012 25%, transparent 25%);
background-size: 40px 40px;
background-position: 0 0, 20px 20px;`,
    tailwind: `bg-[#fafafa]`,
  },
  {
    id: "squares-nested",
    name: "Squares Nested",
    category: "geometric",
    css: `background-color: #0a0a0f;
background-image: 
  linear-gradient(#ffffff08 1px, transparent 1px),
  linear-gradient(90deg, #ffffff08 1px, transparent 1px),
  linear-gradient(#ffffff05 1px, transparent 1px),
  linear-gradient(90deg, #ffffff05 1px, transparent 1px);
background-size: 60px 60px, 60px 60px, 20px 20px, 20px 20px;`,
    tailwind: `bg-[#0a0a0f]`,
  },
  {
    id: "triangles-light",
    name: "Triangles Light",
    category: "geometric",
    css: `background-color: #fafafa;
background-image: 
  linear-gradient(45deg, #00000010 50%, transparent 50%),
  linear-gradient(-45deg, #00000010 50%, transparent 50%);
background-size: 25px 25px;`,
    tailwind: `bg-[#fafafa]`,
  },
  {
    id: "triangles-dark",
    name: "Triangles Dark",
    category: "geometric",
    css: `background-color: #0a0a0f;
background-image: 
  linear-gradient(135deg, #ffffff08 50%, transparent 50%),
  linear-gradient(-135deg, #ffffff08 50%, transparent 50%);
background-size: 25px 25px;`,
    tailwind: `bg-[#0a0a0f]`,
  },
  {
    id: "waves-smooth",
    name: "Waves Smooth",
    category: "geometric",
    css: `background-color: #fafafa;
background-image: 
  radial-gradient(ellipse at top, transparent 60%, #00000008 60%),
  radial-gradient(ellipse at bottom, transparent 60%, #00000008 60%);
background-size: 100% 40px;`,
    tailwind: `bg-[#fafafa]`,
  },
  {
    id: "weave-light",
    name: "Weave Light",
    category: "geometric",
    css: `background-color: #fafafa;
background-image: 
  linear-gradient(45deg, #00000008 25%, transparent 25%, transparent 75%, #00000008 75%),
  linear-gradient(-45deg, #00000008 25%, transparent 25%, transparent 75%, #00000008 75%);
background-size: 40px 40px;
background-position: 0 0, 20px 20px;`,
    tailwind: `bg-[#fafafa]`,
  },
  {
    id: "weave-dark",
    name: "Weave Dark",
    category: "geometric",
    css: `background-color: #0a0a0f;
background-image: 
  linear-gradient(45deg, #ffffff06 25%, transparent 25%, transparent 75%, #ffffff06 75%),
  linear-gradient(-45deg, #ffffff06 25%, transparent 25%, transparent 75%, #ffffff06 75%);
background-size: 40px 40px;
background-position: 0 0, 20px 20px;`,
    tailwind: `bg-[#0a0a0f]`,
  },
  {
    id: "houndstooth",
    name: "Houndstooth",
    category: "geometric",
    css: `background-color: #fafafa;
background-image: 
  linear-gradient(45deg, #00000015 25%, transparent 25%, transparent 75%, #00000015 75%),
  linear-gradient(45deg, #00000015 25%, transparent 25%, transparent 75%, #00000015 75%),
  linear-gradient(-45deg, #00000008 25%, transparent 25%, transparent 75%, #00000008 75%),
  linear-gradient(-45deg, #00000008 25%, transparent 25%, transparent 75%, #00000008 75%);
background-size: 20px 20px;
background-position: 0 0, 10px 10px, 0 0, 10px 10px;`,
    tailwind: `bg-[#fafafa]`,
  },
  {
    id: "basket-weave",
    name: "Basket Weave",
    category: "geometric",
    css: `background-color: #0a0a0f;
background-image: 
  repeating-linear-gradient(90deg, transparent, transparent 10px, #ffffff08 10px, #ffffff08 20px),
  repeating-linear-gradient(0deg, transparent, transparent 10px, #ffffff08 10px, #ffffff08 20px);
background-size: 40px 40px;`,
    tailwind: `bg-[#0a0a0f]`,
  },
  {
    id: "stripes-candy",
    name: "Stripes Candy",
    category: "geometric",
    css: `background-color: #fafafa;
background-image: repeating-linear-gradient(-45deg, transparent, transparent 15px, #ff006615 15px, #ff006615 30px, transparent 30px, transparent 45px, #00d4ff15 45px, #00d4ff15 60px);`,
    tailwind: `bg-[#fafafa]`,
  },
  {
    id: "tiles-square",
    name: "Tiles Square",
    category: "geometric",
    css: `background-color: #0a0a0f;
background-image: 
  linear-gradient(#ffffff10 3px, transparent 3px),
  linear-gradient(90deg, #ffffff10 3px, transparent 3px);
background-size: 50px 50px;`,
    tailwind: `bg-[#0a0a0f]`,
  },
  {
    id: "tiles-offset",
    name: "Tiles Offset",
    category: "geometric",
    css: `background-color: #fafafa;
background-image: 
  linear-gradient(#00000012 2px, transparent 2px),
  linear-gradient(90deg, #00000012 2px, transparent 2px);
background-size: 60px 60px;
background-position: 0 0, 30px 30px;`,
    tailwind: `bg-[#fafafa]`,
  },
  {
    id: "stars-light",
    name: "Stars Light",
    category: "geometric",
    css: `background-color: #fafafa;
background-image: 
  linear-gradient(45deg, #00000010 1px, transparent 1px),
  linear-gradient(-45deg, #00000010 1px, transparent 1px);
background-size: 20px 20px;`,
    tailwind: `bg-[#fafafa]`,
  },
  {
    id: "stars-dark",
    name: "Stars Dark",
    category: "geometric",
    css: `background-color: #0a0a0f;
background-image: 
  linear-gradient(45deg, #ffffff08 1px, transparent 1px),
  linear-gradient(-45deg, #ffffff08 1px, transparent 1px);
background-size: 20px 20px;`,
    tailwind: `bg-[#0a0a0f]`,
  },
  {
    id: "circuit-board",
    name: "Circuit Board",
    category: "geometric",
    isNew: true,
    css: `background-color: #0a1a0a;
background-image: 
  linear-gradient(#00ff0020 1px, transparent 1px),
  linear-gradient(90deg, #00ff0020 1px, transparent 1px),
  radial-gradient(circle, #00ff0040 2px, transparent 2px);
background-size: 40px 40px, 40px 40px, 40px 40px;
background-position: 0 0, 0 0, 20px 20px;`,
    tailwind: `bg-[#0a1a0a]`,
  },
  {
    id: "graph-paper",
    name: "Graph Paper",
    category: "geometric",
    css: `background-color: #fafafa;
background-image: 
  linear-gradient(#00000008 1px, transparent 1px),
  linear-gradient(90deg, #00000008 1px, transparent 1px),
  linear-gradient(#00000015 1px, transparent 1px),
  linear-gradient(90deg, #00000015 1px, transparent 1px);
background-size: 20px 20px, 20px 20px, 100px 100px, 100px 100px;`,
    tailwind: `bg-[#fafafa]`,
  },
  {
    id: "moroccan-tiles",
    name: "Moroccan Tiles",
    category: "geometric",
    css: `background-color: #0a0a0f;
background-image: 
  radial-gradient(ellipse at 50% 0%, transparent 50%, #ffffff08 50%),
  radial-gradient(ellipse at 50% 100%, transparent 50%, #ffffff08 50%);
background-size: 50px 50px;
background-position: 0 0, 25px 25px;`,
    tailwind: `bg-[#0a0a0f]`,
  },
  {
    id: "scallop",
    name: "Scallop",
    category: "geometric",
    css: `background-color: #fafafa;
background-image: 
  radial-gradient(ellipse at bottom, #00000012 0%, transparent 70%);
background-size: 40px 40px;
background-position: 0 0;`,
    tailwind: `bg-[#fafafa]`,
  },
  {
    id: "fish-scale",
    name: "Fish Scale",
    category: "geometric",
    css: `background-color: #0a0a0f;
background-image: 
  radial-gradient(ellipse at 50% 0%, #ffffff10 0%, transparent 50%),
  radial-gradient(ellipse at 50% 100%, #ffffff10 0%, transparent 50%);
background-size: 30px 30px;
background-position: 0 0, 15px 15px;`,
    tailwind: `bg-[#0a0a0f]`,
  },
  {
    id: "diamond-plate",
    name: "Diamond Plate",
    category: "geometric",
    css: `background-color: #e0e0e0;
background-image: 
  linear-gradient(45deg, #00000008 25%, transparent 25%, transparent 75%, #00000008 75%),
  linear-gradient(-45deg, #00000008 25%, transparent 25%, transparent 75%, #00000008 75%),
  linear-gradient(45deg, transparent 25%, #00000015 25%, #00000015 75%, transparent 75%),
  linear-gradient(-45deg, transparent 25%, #00000015 25%, #00000015 75%, transparent 75%);
background-size: 20px 20px;
background-position: 0 0, 10px 0, 10px -10px, 0px 10px;`,
    tailwind: `bg-[#e0e0e0]`,
  },
  {
    id: "carbon-fiber",
    name: "Carbon Fiber",
    category: "geometric",
    isNew: true,
    css: `background-color: #1a1a1a;
background-image: 
  radial-gradient(ellipse at center, #00000040 0%, transparent 70%),
  linear-gradient(45deg, transparent 45%, #ffffff05 45%, #ffffff05 55%, transparent 55%);
background-size: 8px 8px, 16px 16px;`,
    tailwind: `bg-[#1a1a1a]`,
  },
  {
    id: "lattice",
    name: "Lattice",
    category: "geometric",
    css: `background-color: #fafafa;
background-image: 
  linear-gradient(45deg, #00000010 10%, transparent 10%, transparent 50%, #00000010 50%, #00000010 60%, transparent 60%, transparent),
  linear-gradient(-45deg, #00000010 10%, transparent 10%, transparent 50%, #00000010 50%, #00000010 60%, transparent 60%, transparent);
background-size: 30px 30px;`,
    tailwind: `bg-[#fafafa]`,
  },
  {
    id: "trellis",
    name: "Trellis",
    category: "geometric",
    css: `background-color: #0a0a0f;
background-image: 
  linear-gradient(45deg, transparent 40%, #ffffff08 40%, #ffffff08 60%, transparent 60%),
  linear-gradient(-45deg, transparent 40%, #ffffff08 40%, #ffffff08 60%, transparent 60%);
background-size: 40px 40px;`,
    tailwind: `bg-[#0a0a0f]`,
  },
  {
    id: "zigzag-dense",
    name: "Zigzag Dense",
    category: "geometric",
    css: `background-color: #fafafa;
background-image: 
  linear-gradient(135deg, #00000012 25%, transparent 25%),
  linear-gradient(225deg, #00000012 25%, transparent 25%);
background-size: 15px 30px;`,
    tailwind: `bg-[#fafafa]`,
  },
  {
    id: "zigzag-wide",
    name: "Zigzag Wide",
    category: "geometric",
    css: `background-color: #0a0a0f;
background-image: 
  linear-gradient(135deg, #ffffff08 25%, transparent 25%),
  linear-gradient(225deg, #ffffff08 25%, transparent 25%);
background-size: 40px 80px;`,
    tailwind: `bg-[#0a0a0f]`,
  },
  {
    id: "optical",
    name: "Optical",
    category: "geometric",
    css: `background-color: #fafafa;
background-image: 
  linear-gradient(45deg, #00000015 25%, transparent 25%, transparent 75%, #00000015 75%),
  linear-gradient(-45deg, #00000015 25%, transparent 25%, transparent 75%, #00000015 75%);
background-size: 30px 30px;
background-position: 0 0, 15px 15px;`,
    tailwind: `bg-[#fafafa]`,
  },

  // MORE DECORATIVE
  {
    id: "radial-glow",
    name: "Radial Glow",
    category: "decorative",
    isNew: true,
    css: `background: radial-gradient(circle at center, #00d4ff08 0%, transparent 70%), #0a0a0f;`,
    tailwind: `bg-[radial-gradient(circle_at_center,#00d4ff08_0%,transparent_70%),#0a0a0f]`,
  },
  {
    id: "triple-glow",
    name: "Triple Glow",
    category: "decorative",
    css: `background: 
  radial-gradient(circle at 20% 50%, #00d4ff08 0%, transparent 40%),
  radial-gradient(circle at 50% 50%, #a855f708 0%, transparent 40%),
  radial-gradient(circle at 80% 50%, #10b98108 0%, transparent 40%),
  #0a0a0f;`,
    tailwind: `bg-[radial-gradient(circle_at_20%_50%,#00d4ff08_0%,transparent_40%),radial-gradient(circle_at_50%_50%,#a855f708_0%,transparent_40%),radial-gradient(circle_at_80%_50%,#10b98108_0%,transparent_40%),#0a0a0f]`,
  },
  {
    id: "top-shine",
    name: "Top Shine",
    category: "decorative",
    css: `background: linear-gradient(180deg, #ffffff05 0%, transparent 40%), #0a0a0f;`,
    tailwind: `bg-[linear-gradient(180deg,#ffffff05_0%,transparent_40%),#0a0a0f]`,
  },
  {
    id: "bottom-fade",
    name: "Bottom Fade",
    category: "decorative",
    css: `background: linear-gradient(180deg, transparent 60%, #00000030 100%), #0a0a0f;`,
    tailwind: `bg-[linear-gradient(180deg,transparent_60%,#00000030_100%),#0a0a0f]`,
  },
  {
    id: "side-glow",
    name: "Side Glow",
    category: "decorative",
    css: `background: 
  radial-gradient(ellipse at 0% 50%, #00d4ff10 0%, transparent 50%),
  radial-gradient(ellipse at 100% 50%, #a855f710 0%, transparent 50%),
  #0a0a0f;`,
    tailwind: `bg-[radial-gradient(ellipse_at_0%_50%,#00d4ff10_0%,transparent_50%),radial-gradient(ellipse_at_100%_50%,#a855f710_0%,transparent_50%),#0a0a0f]`,
  },
  {
    id: "organic-blobs",
    name: "Organic Blobs",
    category: "decorative",
    css: `background: 
  radial-gradient(ellipse at 30% 40%, #00d4ff10 0%, transparent 40%),
  radial-gradient(ellipse at 70% 60%, #10b98110 0%, transparent 40%),
  radial-gradient(ellipse at 50% 80%, #a855f708 0%, transparent 40%),
  #0a0a0f;`,
    tailwind: `bg-[radial-gradient(ellipse_at_30%_40%,#00d4ff10_0%,transparent_40%),radial-gradient(ellipse_at_70%_60%,#10b98110_0%,transparent_40%),radial-gradient(ellipse_at_50%_80%,#a855f708_0%,transparent_40%),#0a0a0f]`,
  },
  {
    id: "center-burst",
    name: "Center Burst",
    category: "decorative",
    css: `background: radial-gradient(circle at center, #ffffff08 0%, transparent 60%), #0a0a0f;`,
    tailwind: `bg-[radial-gradient(circle_at_center,#ffffff08_0%,transparent_60%),#0a0a0f]`,
  },
  {
    id: "diagonal-glow",
    name: "Diagonal Glow",
    category: "decorative",
    css: `background: linear-gradient(135deg, #00d4ff08 0%, transparent 50%, #a855f708 100%), #0a0a0f;`,
    tailwind: `bg-[linear-gradient(135deg,#00d4ff08_0%,transparent_50%,#a855f708_100%),#0a0a0f]`,
  },
  {
    id: "four-corners",
    name: "Four Corners",
    category: "decorative",
    css: `background: 
  radial-gradient(circle at 0% 0%, #00d4ff08 0%, transparent 30%),
  radial-gradient(circle at 100% 0%, #a855f708 0%, transparent 30%),
  radial-gradient(circle at 0% 100%, #10b98108 0%, transparent 30%),
  radial-gradient(circle at 100% 100%, #f59e0b08 0%, transparent 30%),
  #0a0a0f;`,
    tailwind: `bg-[radial-gradient(circle_at_0%_0%,#00d4ff08_0%,transparent_30%),radial-gradient(circle_at_100%_0%,#a855f708_0%,transparent_30%),radial-gradient(circle_at_0%_100%,#10b98108_0%,transparent_30%),radial-gradient(circle_at_100%_100%,#f59e0b08_0%,transparent_30%),#0a0a0f]`,
  },
  {
    id: "aurora-wave",
    name: "Aurora Wave",
    category: "decorative",
    css: `background: 
  radial-gradient(ellipse at 50% 0%, #00d4ff15 0%, transparent 50%),
  radial-gradient(ellipse at 50% 100%, #a855f715 0%, transparent 50%),
  #0a0a0f;`,
    tailwind: `bg-[radial-gradient(ellipse_at_50%_0%,#00d4ff15_0%,transparent_50%),radial-gradient(ellipse_at_50%_100%,#a855f715_0%,transparent_50%),#0a0a0f]`,
  },

  // MORE EFFECTS
  {
    id: "soft-glow",
    name: "Soft Glow",
    category: "effects",
    isNew: true,
    css: `background: 
  radial-gradient(circle at 40% 40%, #00d4ff12 0%, transparent 50%),
  radial-gradient(circle at 60% 60%, #a855f712 0%, transparent 50%),
  #0a0a0f;`,
    tailwind: `bg-[radial-gradient(circle_at_40%_40%,#00d4ff12_0%,transparent_50%),radial-gradient(circle_at_60%_60%,#a855f712_0%,transparent_50%),#0a0a0f]`,
  },
  {
    id: "neon-grid",
    name: "Neon Grid",
    category: "effects",
    css: `background-color: #0a0a0f;
background-image: 
  linear-gradient(#00d4ff25 2px, transparent 2px),
  linear-gradient(90deg, #00d4ff25 2px, transparent 2px);
background-size: 100px 100px;`,
    tailwind: `bg-[#0a0a0f]`,
  },
  {
    id: "gradient-noise",
    name: "Gradient Noise",
    category: "effects",
    css: `background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
background-blend-mode: overlay;
opacity: 0.95;`,
    tailwind: `bg-gradient-to-br from-[#1a1a2e] to-[#16213e]`,
  },
  {
    id: "tinted-glass",
    name: "Tinted Glass",
    category: "effects",
    css: `background: linear-gradient(135deg, rgba(10, 10, 15, 0.9) 0%, rgba(26, 26, 46, 0.8) 100%);
backdrop-filter: blur(16px) saturate(150%);
border: 1px solid rgba(255, 255, 255, 0.08);`,
    tailwind: `bg-gradient-to-br from-[#0a0a0f]/90 to-[#1a1a2e]/80 backdrop-blur-2xl backdrop-saturate-150 border border-white/[0.08]`,
  },
  {
    id: "holographic",
    name: "Holographic",
    category: "effects",
    css: `background: 
  linear-gradient(125deg, transparent 0%, #00d4ff10 40%, transparent 60%, #a855f710 100%),
  #0a0a0f;`,
    tailwind: `bg-[linear-gradient(125deg,transparent_0%,#00d4ff10_40%,transparent_60%,#a855f710_100%),#0a0a0f]`,
  },
  {
    id: "shimmer",
    name: "Shimmer",
    category: "effects",
    css: `background: linear-gradient(90deg, #0a0a0f 0%, #1a1a2e 50%, #0a0a0f 100%);
background-size: 200% 100%;`,
    tailwind: `bg-gradient-to-r from-[#0a0a0f] via-[#1a1a2e] to-[#0a0a0f] bg-[length:200%_100%]`,
  },
  {
    id: "pixelated",
    name: "Pixelated",
    category: "effects",
    css: `background-color: #fafafa;
background-image: 
  linear-gradient(#00000010 1px, transparent 1px),
  linear-gradient(90deg, #00000010 1px, transparent 1px);
background-size: 8px 8px;`,
    tailwind: `bg-[#fafafa]`,
  },
  {
    id: "radial-blur",
    name: "Radial Blur",
    category: "effects",
    css: `background: 
  radial-gradient(circle at center, transparent 0%, #0a0a0f 70%),
  radial-gradient(circle at center, #00d4ff10 0%, transparent 40%),
  #0a0a0f;`,
    tailwind: `bg-[radial-gradient(circle_at_center,transparent_0%,#0a0a0f_70%),radial-gradient(circle_at_center,#00d4ff10_0%,transparent_40%),#0a0a0f]`,
  },
  {
    id: "spotlight-effect",
    name: "Spotlight Effect",
    category: "effects",
    css: `background: 
  radial-gradient(ellipse at 50% 30%, #ffffff15 0%, transparent 60%),
  #0a0a0f;`,
    tailwind: `bg-[radial-gradient(ellipse_at_50%_30%,#ffffff15_0%,transparent_60%),#0a0a0f]`,
  },
  {
    id: "color-shift",
    name: "Color Shift",
    category: "effects",
    css: `background: linear-gradient(270deg, #0a0a0f, #1a1a2e, #16213e, #0f3460);
background-size: 800% 800%;`,
    tailwind: `bg-gradient-to-r from-[#0a0a0f] via-[#1a1a2e] via-[#16213e] to-[#0f3460] bg-[length:800%_800%]`,
  },
  {
    id: "depth-layers",
    name: "Depth Layers",
    category: "effects",
    css: `background: 
  linear-gradient(180deg, transparent 0%, #00000020 100%),
  linear-gradient(90deg, transparent 0%, #ffffff05 50%, transparent 100%),
  #0a0a0f;`,
    tailwind: `bg-[linear-gradient(180deg,transparent_0%,#00000020_100%),linear-gradient(90deg,transparent_0%,#ffffff05_50%,transparent_100%),#0a0a0f]`,
  },
  {
    id: "plasma",
    name: "Plasma",
    category: "effects",
    css: `background: 
  radial-gradient(circle at 20% 80%, #00d4ff15 0%, transparent 50%),
  radial-gradient(circle at 80% 20%, #a855f715 0%, transparent 50%),
  radial-gradient(circle at 40% 40%, #10b98115 0%, transparent 50%),
  #0a0a0f;`,
    tailwind: `bg-[radial-gradient(circle_at_20%_80%,#00d4ff15_0%,transparent_50%),radial-gradient(circle_at_80%_20%,#a855f715_0%,transparent_50%),radial-gradient(circle_at_40%_40%,#10b98115_0%,transparent_50%),#0a0a0f]`,
  },
];

export const categories: { id: PatternCategory; label: string; emoji: string }[] = [
  { id: "all", label: "All", emoji: "✨" },
  { id: "gradients", label: "Gradients", emoji: "🌈" },
  { id: "geometric", label: "Geometric", emoji: "⬛" },
  { id: "decorative", label: "Decorative", emoji: "💫" },
  { id: "effects", label: "Effects", emoji: "🎨" },
];