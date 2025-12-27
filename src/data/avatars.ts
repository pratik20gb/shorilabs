export type AvatarCategory = "all" | "circle" | "rounded" | "ring" | "status" | "group" | "bordered";

export interface Avatar {
  id: string;
  name: string;
  category: AvatarCategory;
  css: string;
  tailwind: string;
  isNew?: boolean;
}

export const avatars: Avatar[] = [
  // CIRCLE AVATARS
  {
    id: "circle-basic",
    name: "Circle Basic",
    category: "circle",
    css: `width: 48px;
height: 48px;
border-radius: 50%;
object-fit: cover;`,
    tailwind: `w-12 h-12 rounded-full object-cover`,
  },
  {
    id: "circle-small",
    name: "Circle Small",
    category: "circle",
    css: `width: 32px;
height: 32px;
border-radius: 50%;
object-fit: cover;`,
    tailwind: `w-8 h-8 rounded-full object-cover`,
  },
  {
    id: "circle-large",
    name: "Circle Large",
    category: "circle",
    css: `width: 64px;
height: 64px;
border-radius: 50%;
object-fit: cover;`,
    tailwind: `w-16 h-16 rounded-full object-cover`,
  },
  {
    id: "circle-xlarge",
    name: "Circle XLarge",
    category: "circle",
    isNew: true,
    css: `width: 96px;
height: 96px;
border-radius: 50%;
object-fit: cover;`,
    tailwind: `w-24 h-24 rounded-full object-cover`,
  },

  // ROUNDED AVATARS
  {
    id: "rounded-basic",
    name: "Rounded Basic",
    category: "rounded",
    css: `width: 48px;
height: 48px;
border-radius: 12px;
object-fit: cover;`,
    tailwind: `w-12 h-12 rounded-xl object-cover`,
  },
  {
    id: "rounded-soft",
    name: "Rounded Soft",
    category: "rounded",
    css: `width: 48px;
height: 48px;
border-radius: 8px;
object-fit: cover;`,
    tailwind: `w-12 h-12 rounded-lg object-cover`,
  },
  {
    id: "rounded-square",
    name: "Rounded Square",
    category: "rounded",
    isNew: true,
    css: `width: 48px;
height: 48px;
border-radius: 6px;
object-fit: cover;`,
    tailwind: `w-12 h-12 rounded-md object-cover`,
  },

  // RING AVATARS
  {
    id: "ring-primary",
    name: "Ring Primary",
    category: "ring",
    css: `width: 48px;
height: 48px;
border-radius: 50%;
object-fit: cover;
padding: 2px;
background: #3b82f6;`,
    tailwind: `w-12 h-12 rounded-full object-cover ring-2 ring-blue-500 ring-offset-2`,
  },
  {
    id: "ring-gradient",
    name: "Ring Gradient",
    category: "ring",
    isNew: true,
    css: `width: 48px;
height: 48px;
border-radius: 50%;
object-fit: cover;
padding: 3px;
background: linear-gradient(135deg, #667eea, #764ba2);`,
    tailwind: `w-12 h-12 rounded-full object-cover ring-2 ring-offset-2 [background:linear-gradient(135deg,#667eea,#764ba2)]`,
  },
  {
    id: "ring-rainbow",
    name: "Ring Rainbow",
    category: "ring",
    isNew: true,
    css: `width: 48px;
height: 48px;
border-radius: 50%;
object-fit: cover;
padding: 3px;
background: linear-gradient(135deg, #f97316, #ef4444, #ec4899, #8b5cf6, #3b82f6);`,
    tailwind: `w-12 h-12 rounded-full object-cover ring-2 ring-offset-2 [background:linear-gradient(135deg,#f97316,#ef4444,#ec4899,#8b5cf6,#3b82f6)]`,
  },
  {
    id: "ring-white",
    name: "Ring White",
    category: "ring",
    css: `width: 48px;
height: 48px;
border-radius: 50%;
object-fit: cover;
box-shadow: 0 0 0 3px #ffffff, 0 0 0 5px #e5e7eb;`,
    tailwind: `w-12 h-12 rounded-full object-cover ring-[3px] ring-white shadow-lg`,
  },

  // STATUS AVATARS
  {
    id: "status-online",
    name: "Status Online",
    category: "status",
    css: `position: relative;
width: 48px;
height: 48px;

img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

&::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 14px;
  height: 14px;
  background: #10b981;
  border: 2px solid #ffffff;
  border-radius: 50%;
}`,
    tailwind: `relative w-12 h-12 [&>img]:w-full [&>img]:h-full [&>img]:rounded-full [&>img]:object-cover after:absolute after:bottom-0 after:right-0 after:w-3.5 after:h-3.5 after:bg-emerald-500 after:border-2 after:border-white after:rounded-full`,
  },
  {
    id: "status-away",
    name: "Status Away",
    category: "status",
    css: `position: relative;
width: 48px;
height: 48px;

img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

&::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 14px;
  height: 14px;
  background: #f59e0b;
  border: 2px solid #ffffff;
  border-radius: 50%;
}`,
    tailwind: `relative w-12 h-12 [&>img]:w-full [&>img]:h-full [&>img]:rounded-full [&>img]:object-cover after:absolute after:bottom-0 after:right-0 after:w-3.5 after:h-3.5 after:bg-amber-500 after:border-2 after:border-white after:rounded-full`,
  },
  {
    id: "status-busy",
    name: "Status Busy",
    category: "status",
    isNew: true,
    css: `position: relative;
width: 48px;
height: 48px;

img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

&::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 14px;
  height: 14px;
  background: #ef4444;
  border: 2px solid #ffffff;
  border-radius: 50%;
}`,
    tailwind: `relative w-12 h-12 [&>img]:w-full [&>img]:h-full [&>img]:rounded-full [&>img]:object-cover after:absolute after:bottom-0 after:right-0 after:w-3.5 after:h-3.5 after:bg-red-500 after:border-2 after:border-white after:rounded-full`,
  },

  // GROUP AVATARS
  {
    id: "group-stack",
    name: "Group Stack",
    category: "group",
    css: `display: flex;

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ffffff;
  margin-left: -12px;
}
.avatar:first-child { margin-left: 0; }`,
    tailwind: `flex [&>*]:w-10 [&>*]:h-10 [&>*]:rounded-full [&>*]:object-cover [&>*]:border-2 [&>*]:border-white [&>*]:-ml-3 [&>*:first-child]:ml-0`,
  },
  {
    id: "group-count",
    name: "Group Count",
    category: "group",
    isNew: true,
    css: `display: flex;
align-items: center;

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ffffff;
  margin-left: -12px;
}
.avatar:first-child { margin-left: 0; }

.count {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #3b82f6;
  color: #ffffff;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: -12px;
  border: 2px solid #ffffff;
}`,
    tailwind: `flex items-center [&>.avatar]:w-10 [&>.avatar]:h-10 [&>.avatar]:rounded-full [&>.avatar]:object-cover [&>.avatar]:border-2 [&>.avatar]:border-white [&>.avatar]:-ml-3 [&>.avatar:first-child]:ml-0 [&>.count]:w-10 [&>.count]:h-10 [&>.count]:rounded-full [&>.count]:bg-blue-500 [&>.count]:text-white [&>.count]:text-xs [&>.count]:font-semibold [&>.count]:flex [&>.count]:items-center [&>.count]:justify-center [&>.count]:-ml-3 [&>.count]:border-2 [&>.count]:border-white`,
  },

  // BORDERED AVATARS
  {
    id: "bordered-simple",
    name: "Bordered Simple",
    category: "bordered",
    css: `width: 48px;
height: 48px;
border-radius: 50%;
object-fit: cover;
border: 2px solid #e5e7eb;`,
    tailwind: `w-12 h-12 rounded-full object-cover border-2 border-gray-200`,
  },
  {
    id: "bordered-thick",
    name: "Bordered Thick",
    category: "bordered",
    css: `width: 48px;
height: 48px;
border-radius: 50%;
object-fit: cover;
border: 4px solid #e5e7eb;`,
    tailwind: `w-12 h-12 rounded-full object-cover border-4 border-gray-200`,
  },
  {
    id: "bordered-colored",
    name: "Bordered Colored",
    category: "bordered",
    isNew: true,
    css: `width: 48px;
height: 48px;
border-radius: 50%;
object-fit: cover;
border: 3px solid #3b82f6;`,
    tailwind: `w-12 h-12 rounded-full object-cover border-[3px] border-blue-500`,
  },
  {
    id: "bordered-dashed",
    name: "Bordered Dashed",
    category: "bordered",
    css: `width: 48px;
height: 48px;
border-radius: 50%;
object-fit: cover;
border: 2px dashed #9ca3af;`,
    tailwind: `w-12 h-12 rounded-full object-cover border-2 border-dashed border-gray-400`,
  },
];

export const avatarCategories: { id: AvatarCategory; label: string; emoji: string }[] = [
  { id: "all", label: "All", emoji: "✨" },
  { id: "circle", label: "Circle", emoji: "⭕" },
  { id: "rounded", label: "Rounded", emoji: "🔲" },
  { id: "ring", label: "Ring", emoji: "💍" },
  { id: "status", label: "Status", emoji: "🟢" },
  { id: "group", label: "Group", emoji: "👥" },
  { id: "bordered", label: "Bordered", emoji: "🖼️" },
];

