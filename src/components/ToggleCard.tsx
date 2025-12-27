import { useState } from "react";
import { Copy, Check, Heart } from "lucide-react";
import { Toggle } from "@/data/toggles";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ToggleCardProps {
  toggle: Toggle;
  onPreview: (toggle: Toggle) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export const ToggleCard = ({
  toggle,
  onPreview,
  isFavorite,
  onToggleFavorite,
}: ToggleCardProps) => {
  const [copied, setCopied] = useState(false);
  const [isOn, setIsOn] = useState(false);

  const copyToClipboard = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(toggle.css);
    setCopied(true);
    toast.success("Copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("toggle", JSON.stringify(toggle));
    e.dataTransfer.effectAllowed = "copy";
    (e.target as HTMLElement).style.opacity = "0.5";
  };

  const handleDragEnd = (e: React.DragEvent) => {
    (e.target as HTMLElement).style.opacity = "1";
  };

  // Render toggle preview
  const renderTogglePreview = () => {
    const category = toggle.category;
    
    const baseTrack = "w-11 h-6 rounded-full relative transition-colors cursor-pointer";
    const baseThumb = "absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform";
    
    if (category === "ios") {
      return (
        <div 
          className={cn(baseTrack, isOn ? "bg-[#34c759]" : "bg-gray-200")}
          onClick={(e) => { e.stopPropagation(); setIsOn(!isOn); }}
        >
          <div className={cn(baseThumb, isOn ? "left-[22px]" : "left-0.5")} />
        </div>
      );
    }
    if (category === "material") {
      return (
        <div 
          className={cn("w-9 h-3.5 rounded-full relative transition-colors cursor-pointer", isOn ? "bg-blue-200" : "bg-gray-400")}
          onClick={(e) => { e.stopPropagation(); setIsOn(!isOn); }}
        >
          <div className={cn(
            "absolute -top-[3px] w-5 h-5 rounded-full shadow-md transition-all",
            isOn ? "left-4 bg-blue-500" : "left-0 bg-gray-50"
          )} />
        </div>
      );
    }
    
    return (
      <div 
        className={cn(baseTrack, isOn ? "bg-blue-500" : "bg-gray-200")}
        onClick={(e) => { e.stopPropagation(); setIsOn(!isOn); }}
      >
        <div className={cn(baseThumb, isOn ? "left-[22px]" : "left-0.5")} />
      </div>
    );
  };

  return (
    <div
      className="group relative cursor-pointer"
      onClick={() => onPreview(toggle)}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {/* Toggle Preview Container */}
      <div className="aspect-square rounded-lg overflow-hidden border border-border/40 bg-gradient-to-br from-gray-50/80 to-white/80 hover:border-border flex items-center justify-center transition-all duration-300 hover:shadow-lg p-4">
        {/* Live Toggle Preview */}
        {renderTogglePreview()}

        {/* New Badge */}
        {toggle.isNew && (
          <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[9px] font-medium uppercase bg-foreground/90 text-background">
            New
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-3 bg-background/[0.97]">
          {/* Toggle Info */}
          <div>
            <p className="text-sm font-semibold text-foreground">
              {toggle.name}
            </p>
            <p className="text-xs capitalize mt-0.5 text-muted-foreground">
              {toggle.category}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-1.5 justify-end">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(toggle.id);
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

