import { useState } from "react";
import { Copy, Check, Heart } from "lucide-react";
import { Divider } from "@/data/dividers";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface DividerCardProps {
  divider: Divider;
  onPreview: (divider: Divider) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export const DividerCard = ({
  divider,
  onPreview,
  isFavorite,
  onToggleFavorite,
}: DividerCardProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(divider.css);
    setCopied(true);
    toast.success("Copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("divider", JSON.stringify(divider));
    e.dataTransfer.effectAllowed = "copy";
    (e.target as HTMLElement).style.opacity = "0.5";
  };

  const handleDragEnd = (e: React.DragEvent) => {
    (e.target as HTMLElement).style.opacity = "1";
  };

  // Render divider preview based on category
  const renderDividerPreview = () => {
    const category = divider.category;
    
    if (category === "solid") {
      return <div className="w-full h-px bg-gray-300" />;
    }
    if (category === "dashed") {
      return <div className="w-full border-t-2 border-dashed border-gray-300" />;
    }
    if (category === "gradient") {
      return <div className="w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded" />;
    }
    if (category === "decorated") {
      return (
        <div className="w-full flex items-center gap-2">
          <div className="flex-1 h-px bg-gray-300" />
          <div className="w-1.5 h-1.5 bg-gray-400 rotate-45" />
          <div className="flex-1 h-px bg-gray-300" />
        </div>
      );
    }
    if (category === "text") {
      return (
        <div className="w-full flex items-center gap-2">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-[10px] text-gray-400 font-medium">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
      );
    }
    if (category === "fade") {
      return <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />;
    }
    
    return <div className="w-full h-px bg-gray-300" />;
  };

  return (
    <div
      className="group relative cursor-pointer"
      onClick={() => onPreview(divider)}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {/* Divider Preview Container */}
      <div className="aspect-square rounded-lg overflow-hidden border border-border/40 bg-gradient-to-br from-gray-50/80 to-white/80 hover:border-border flex items-center justify-center transition-all duration-300 hover:shadow-lg px-6">
        {/* Live Divider Preview */}
        {renderDividerPreview()}

        {/* New Badge */}
        {divider.isNew && (
          <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[9px] font-medium uppercase bg-foreground/90 text-background">
            New
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-3 bg-background/[0.97]">
          {/* Divider Info */}
          <div>
            <p className="text-sm font-semibold text-foreground">
              {divider.name}
            </p>
            <p className="text-xs capitalize mt-0.5 text-muted-foreground">
              {divider.category}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-1.5 justify-end">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(divider.id);
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

