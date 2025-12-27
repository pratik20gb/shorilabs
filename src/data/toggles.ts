export type ToggleCategory = "all" | "default" | "ios" | "material" | "pill" | "icon" | "labeled";

export interface Toggle {
  id: string;
  name: string;
  category: ToggleCategory;
  css: string;
  tailwind: string;
  isNew?: boolean;
}

export const toggles: Toggle[] = [
  // DEFAULT TOGGLES
  {
    id: "default-basic",
    name: "Default Basic",
    category: "default",
    css: `width: 44px;
height: 24px;
background: #e5e7eb;
border-radius: 9999px;
position: relative;
cursor: pointer;
transition: background 0.2s ease;

&::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  background: #ffffff;
  border-radius: 50%;
  transition: transform 0.2s ease;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

&.active {
  background: #3b82f6;
}
&.active::after {
  transform: translateX(20px);
}`,
    tailwind: `w-11 h-6 bg-gray-200 rounded-full relative cursor-pointer transition-colors peer-checked:bg-blue-500 after:absolute after:top-0.5 after:left-0.5 after:w-5 after:h-5 after:bg-white after:rounded-full after:shadow after:transition-transform peer-checked:after:translate-x-5`,
  },
  {
    id: "default-small",
    name: "Default Small",
    category: "default",
    css: `width: 36px;
height: 20px;
background: #e5e7eb;
border-radius: 9999px;
position: relative;
cursor: pointer;
transition: background 0.2s ease;

&::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  background: #ffffff;
  border-radius: 50%;
  transition: transform 0.2s ease;
}`,
    tailwind: `w-9 h-5 bg-gray-200 rounded-full relative cursor-pointer transition-colors peer-checked:bg-blue-500 after:absolute after:top-0.5 after:left-0.5 after:w-4 after:h-4 after:bg-white after:rounded-full after:transition-transform peer-checked:after:translate-x-4`,
  },
  {
    id: "default-large",
    name: "Default Large",
    category: "default",
    isNew: true,
    css: `width: 56px;
height: 30px;
background: #e5e7eb;
border-radius: 9999px;
position: relative;
cursor: pointer;
transition: background 0.2s ease;

&::after {
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  width: 24px;
  height: 24px;
  background: #ffffff;
  border-radius: 50%;
  transition: transform 0.2s ease;
  box-shadow: 0 1px 3px rgba(0,0,0,0.15);
}`,
    tailwind: `w-14 h-[30px] bg-gray-200 rounded-full relative cursor-pointer transition-colors peer-checked:bg-blue-500 after:absolute after:top-[3px] after:left-[3px] after:w-6 after:h-6 after:bg-white after:rounded-full after:shadow-md after:transition-transform peer-checked:after:translate-x-6`,
  },

  // IOS STYLE
  {
    id: "ios-green",
    name: "iOS Green",
    category: "ios",
    css: `width: 51px;
height: 31px;
background: #e5e7eb;
border-radius: 9999px;
position: relative;
cursor: pointer;
transition: background 0.3s ease;

&::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 27px;
  height: 27px;
  background: #ffffff;
  border-radius: 50%;
  transition: transform 0.3s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

&.active {
  background: #34c759;
}
&.active::after {
  transform: translateX(20px);
}`,
    tailwind: `w-[51px] h-[31px] bg-gray-200 rounded-full relative cursor-pointer transition-colors duration-300 peer-checked:bg-[#34c759] after:absolute after:top-0.5 after:left-0.5 after:w-[27px] after:h-[27px] after:bg-white after:rounded-full after:shadow-md after:transition-transform after:duration-300 peer-checked:after:translate-x-5`,
  },
  {
    id: "ios-blue",
    name: "iOS Blue",
    category: "ios",
    isNew: true,
    css: `width: 51px;
height: 31px;
background: #e5e7eb;
border-radius: 9999px;
position: relative;
cursor: pointer;
transition: background 0.3s ease;

&::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 27px;
  height: 27px;
  background: #ffffff;
  border-radius: 50%;
  transition: transform 0.3s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

&.active {
  background: #007aff;
}`,
    tailwind: `w-[51px] h-[31px] bg-gray-200 rounded-full relative cursor-pointer transition-colors duration-300 peer-checked:bg-[#007aff] after:absolute after:top-0.5 after:left-0.5 after:w-[27px] after:h-[27px] after:bg-white after:rounded-full after:shadow-md after:transition-transform after:duration-300 peer-checked:after:translate-x-5`,
  },

  // MATERIAL STYLE
  {
    id: "material-primary",
    name: "Material Primary",
    category: "material",
    css: `width: 36px;
height: 14px;
background: #b0bec5;
border-radius: 9999px;
position: relative;
cursor: pointer;
transition: background 0.2s ease;

&::after {
  content: '';
  position: absolute;
  top: -3px;
  left: 0;
  width: 20px;
  height: 20px;
  background: #fafafa;
  border-radius: 50%;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

&.active {
  background: #90caf9;
}
&.active::after {
  background: #2196f3;
  transform: translateX(16px);
}`,
    tailwind: `w-9 h-3.5 bg-gray-400 rounded-full relative cursor-pointer transition-colors peer-checked:bg-blue-200 after:absolute after:-top-[3px] after:left-0 after:w-5 after:h-5 after:bg-gray-50 after:rounded-full after:shadow-md after:transition-all peer-checked:after:bg-blue-500 peer-checked:after:translate-x-4`,
  },
  {
    id: "material-pink",
    name: "Material Pink",
    category: "material",
    isNew: true,
    css: `width: 36px;
height: 14px;
background: #b0bec5;
border-radius: 9999px;
position: relative;
cursor: pointer;
transition: background 0.2s ease;

&::after {
  content: '';
  position: absolute;
  top: -3px;
  left: 0;
  width: 20px;
  height: 20px;
  background: #fafafa;
  border-radius: 50%;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

&.active {
  background: #f48fb1;
}
&.active::after {
  background: #e91e63;
  transform: translateX(16px);
}`,
    tailwind: `w-9 h-3.5 bg-gray-400 rounded-full relative cursor-pointer transition-colors peer-checked:bg-pink-200 after:absolute after:-top-[3px] after:left-0 after:w-5 after:h-5 after:bg-gray-50 after:rounded-full after:shadow-md after:transition-all peer-checked:after:bg-pink-500 peer-checked:after:translate-x-4`,
  },

  // PILL STYLE
  {
    id: "pill-rounded",
    name: "Pill Rounded",
    category: "pill",
    css: `width: 60px;
height: 28px;
background: #f3f4f6;
border-radius: 6px;
position: relative;
cursor: pointer;
transition: background 0.2s ease;

&::after {
  content: '';
  position: absolute;
  top: 4px;
  left: 4px;
  width: 24px;
  height: 20px;
  background: #ffffff;
  border-radius: 4px;
  transition: transform 0.2s ease;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

&.active {
  background: #3b82f6;
}
&.active::after {
  transform: translateX(28px);
}`,
    tailwind: `w-[60px] h-7 bg-gray-100 rounded-md relative cursor-pointer transition-colors peer-checked:bg-blue-500 after:absolute after:top-1 after:left-1 after:w-6 after:h-5 after:bg-white after:rounded after:shadow-sm after:transition-transform peer-checked:after:translate-x-7`,
  },
  {
    id: "pill-outline",
    name: "Pill Outline",
    category: "pill",
    css: `width: 56px;
height: 28px;
background: transparent;
border: 2px solid #d1d5db;
border-radius: 8px;
position: relative;
cursor: pointer;
transition: all 0.2s ease;

&::after {
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  width: 18px;
  height: 18px;
  background: #d1d5db;
  border-radius: 4px;
  transition: all 0.2s ease;
}

&.active {
  border-color: #3b82f6;
}
&.active::after {
  background: #3b82f6;
  transform: translateX(26px);
}`,
    tailwind: `w-14 h-7 bg-transparent border-2 border-gray-300 rounded-lg relative cursor-pointer transition-all peer-checked:border-blue-500 after:absolute after:top-[3px] after:left-[3px] after:w-[18px] after:h-[18px] after:bg-gray-300 after:rounded after:transition-all peer-checked:after:bg-blue-500 peer-checked:after:translate-x-[26px]`,
  },

  // ICON STYLE
  {
    id: "icon-sun-moon",
    name: "Sun Moon",
    category: "icon",
    isNew: true,
    css: `width: 56px;
height: 28px;
background: #fef3c7;
border-radius: 9999px;
position: relative;
cursor: pointer;
transition: background 0.3s ease;

&::after {
  content: '☀️';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 24px;
  height: 24px;
  background: #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  transition: transform 0.3s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

&.active {
  background: #1e293b;
}
&.active::after {
  content: '🌙';
  transform: translateX(28px);
}`,
    tailwind: `w-14 h-7 bg-amber-100 rounded-full relative cursor-pointer transition-colors duration-300 peer-checked:bg-slate-800 after:absolute after:top-0.5 after:left-0.5 after:w-6 after:h-6 after:bg-white after:rounded-full after:shadow after:transition-transform after:duration-300 after:flex after:items-center after:justify-center peer-checked:after:translate-x-7`,
  },
  {
    id: "icon-check-x",
    name: "Check X",
    category: "icon",
    css: `width: 48px;
height: 24px;
background: #fee2e2;
border-radius: 9999px;
position: relative;
cursor: pointer;
transition: background 0.2s ease;

&::after {
  content: '✕';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  background: #ef4444;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: white;
  transition: all 0.2s ease;
}

&.active {
  background: #d1fae5;
}
&.active::after {
  content: '✓';
  background: #10b981;
  transform: translateX(24px);
}`,
    tailwind: `w-12 h-6 bg-red-100 rounded-full relative cursor-pointer transition-colors peer-checked:bg-emerald-100 after:absolute after:top-0.5 after:left-0.5 after:w-5 after:h-5 after:bg-red-500 after:rounded-full after:transition-all after:flex after:items-center after:justify-center after:text-white after:text-[10px] peer-checked:after:bg-emerald-500 peer-checked:after:translate-x-6`,
  },

  // LABELED STYLE
  {
    id: "labeled-on-off",
    name: "Labeled On Off",
    category: "labeled",
    css: `width: 64px;
height: 28px;
background: #e5e7eb;
border-radius: 9999px;
position: relative;
cursor: pointer;
transition: background 0.2s ease;
font-size: 10px;
font-weight: 600;

&::before {
  content: 'OFF';
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
}

&::after {
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  width: 22px;
  height: 22px;
  background: #ffffff;
  border-radius: 50%;
  transition: transform 0.2s ease;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

&.active::before {
  content: 'ON';
  left: 12px;
  right: auto;
  color: #ffffff;
}
&.active {
  background: #3b82f6;
}
&.active::after {
  transform: translateX(36px);
}`,
    tailwind: `w-16 h-7 bg-gray-200 rounded-full relative cursor-pointer transition-colors peer-checked:bg-blue-500 after:absolute after:top-[3px] after:left-[3px] after:w-[22px] after:h-[22px] after:bg-white after:rounded-full after:shadow after:transition-transform peer-checked:after:translate-x-9`,
  },
  {
    id: "labeled-yes-no",
    name: "Labeled Yes No",
    category: "labeled",
    isNew: true,
    css: `width: 68px;
height: 30px;
background: #fee2e2;
border-radius: 9999px;
position: relative;
cursor: pointer;
transition: background 0.2s ease;
font-size: 11px;
font-weight: 600;

&::before {
  content: 'NO';
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #ef4444;
}

&::after {
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  width: 24px;
  height: 24px;
  background: #ffffff;
  border-radius: 50%;
  transition: transform 0.2s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

&.active::before {
  content: 'YES';
  left: 10px;
  right: auto;
  color: #10b981;
}
&.active {
  background: #d1fae5;
}
&.active::after {
  transform: translateX(38px);
}`,
    tailwind: `w-[68px] h-[30px] bg-red-100 rounded-full relative cursor-pointer transition-colors peer-checked:bg-emerald-100 after:absolute after:top-[3px] after:left-[3px] after:w-6 after:h-6 after:bg-white after:rounded-full after:shadow after:transition-transform peer-checked:after:translate-x-[38px]`,
  },
];

export const toggleCategories: { id: ToggleCategory; label: string; emoji: string }[] = [
  { id: "all", label: "All", emoji: "✨" },
  { id: "default", label: "Default", emoji: "🔘" },
  { id: "ios", label: "iOS", emoji: "🍎" },
  { id: "material", label: "Material", emoji: "🎨" },
  { id: "pill", label: "Pill", emoji: "💊" },
  { id: "icon", label: "Icon", emoji: "🌓" },
  { id: "labeled", label: "Labeled", emoji: "🏷️" },
];

