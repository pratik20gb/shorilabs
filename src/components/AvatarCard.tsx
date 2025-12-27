import { useState } from "react";
import { Copy, Check, Heart } from "lucide-react";
import { Avatar } from "@/data/avatars";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface AvatarCardProps {
  avatar: Avatar;
  onPreview: (avatar: Avatar) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export const AvatarCard = ({
  avatar,
  onPreview,
  isFavorite,
  onToggleFavorite,
}: AvatarCardProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(avatar.css);
    setCopied(true);
    toast.success("Copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("avatar", JSON.stringify(avatar));
    e.dataTransfer.effectAllowed = "copy";
    (e.target as HTMLElement).style.opacity = "0.5";
  };

  const handleDragEnd = (e: React.DragEvent) => {
    (e.target as HTMLElement).style.opacity = "1";
  };

  // Render avatar preview based on category
  const renderAvatarPreview = () => {
    const category = avatar.category;
    const baseClasses = "bg-gradient-to-br from-blue-400 to-purple-500";
    
    if (category === "circle" || category === "bordered") {
      return (
        <div className={cn("w-12 h-12 rounded-full", baseClasses)} />
      );
    }
    if (category === "rounded") {
      return (
        <div className={cn("w-12 h-12 rounded-xl", baseClasses)} />
      );
    }
    if (category === "ring") {
      return (
        <div className="p-0.5 rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
          <div className={cn("w-11 h-11 rounded-full ring-2 ring-white", baseClasses)} />
        </div>
      );
    }
    if (category === "status") {
      return (
        <div className="relative">
          <div className={cn("w-12 h-12 rounded-full", baseClasses)} />
          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white" />
        </div>
      );
    }
    if (category === "group") {
      return (
        <div className="flex -space-x-3">
          <div className={cn("w-10 h-10 rounded-full border-2 border-white", baseClasses)} />
          <div className={cn("w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-pink-400 to-red-500")} />
          <div className={cn("w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-green-400 to-emerald-500")} />
        </div>
      );
    }
    
    return (
      <div className={cn("w-12 h-12 rounded-full", baseClasses)} />
    );
  };

  return (
    <div
      className="group relative cursor-pointer"
      onClick={() => onPreview(avatar)}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {/* Avatar Preview Container */}
      <div className="aspect-square rounded-lg overflow-hidden border border-border/40 bg-gradient-to-br from-gray-50/80 to-white/80 hover:border-border flex items-center justify-center transition-all duration-300 hover:shadow-lg p-4">
        {/* Live Avatar Preview */}
        {renderAvatarPreview()}

        {/* New Badge */}
        {avatar.isNew && (
          <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[9px] font-medium uppercase bg-foreground/90 text-background">
            New
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-3 bg-background/[0.97]">
          {/* Avatar Info */}
          <div>
            <p className="text-sm font-semibold text-foreground">
              {avatar.name}
            </p>
            <p className="text-xs capitalize mt-0.5 text-muted-foreground">
              {avatar.category}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-1.5 justify-end">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(avatar.id);
              }}
              className={cn(
                "p-2 rounded-md transition-colors bg-secondary/80 hover:bg-secondary",
                isFavorite ? "text-red-500" : "text-foreground"
              )}
            >
              <Heart className={cn("w-3.5 h-3.5", isFavorite && "fill-current")} />
            </button>
            <button
              onClick={copyToClipboard}
              className="p-2 rounded-md transition-colors bg-secondary/80 hover:bg-secondary text-foreground"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-green-500" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

