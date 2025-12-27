import { useState } from "react";
import { Copy, Check, Heart } from "lucide-react";
import { Loader } from "@/data/loaders";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface LoaderCardProps {
  loader: Loader;
  onPreview: (loader: Loader) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export const LoaderCard = ({
  loader,
  onPreview,
  isFavorite,
  onToggleFavorite,
}: LoaderCardProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(loader.css);
    setCopied(true);
    toast.success("Copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("loader", JSON.stringify(loader));
    e.dataTransfer.effectAllowed = "copy";
    (e.target as HTMLElement).style.opacity = "0.5";
  };

  const handleDragEnd = (e: React.DragEvent) => {
    (e.target as HTMLElement).style.opacity = "1";
  };

  // Render loader preview based on category
  const renderLoaderPreview = () => {
    const category = loader.category;
    
    if (category === "spinner") {
      return (
        <div className="w-8 h-8 border-2 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
      );
    }
    if (category === "dots") {
      return (
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      );
    }
    if (category === "bars") {
      return (
        <div className="flex gap-0.5 items-end">
          <div className="w-1 h-4 bg-blue-500 rounded-sm animate-pulse" style={{ animationDelay: "0ms" }} />
          <div className="w-1 h-6 bg-blue-500 rounded-sm animate-pulse" style={{ animationDelay: "150ms" }} />
          <div className="w-1 h-5 bg-blue-500 rounded-sm animate-pulse" style={{ animationDelay: "300ms" }} />
          <div className="w-1 h-7 bg-blue-500 rounded-sm animate-pulse" style={{ animationDelay: "450ms" }} />
        </div>
      );
    }
    if (category === "pulse") {
      return (
        <div className="w-5 h-5 bg-blue-500 rounded-full animate-ping" />
      );
    }
    if (category === "skeleton") {
      return (
        <div className="w-20 h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse" />
      );
    }
    if (category === "progress") {
      return (
        <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full w-3/5 bg-blue-500 rounded-full animate-pulse" />
        </div>
      );
    }
    
    return (
      <div className="w-6 h-6 border-2 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
    );
  };

  return (
    <div
      className="group relative cursor-pointer"
      onClick={() => onPreview(loader)}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {/* Loader Preview Container */}
      <div className="aspect-square rounded-lg overflow-hidden border border-border/40 bg-gradient-to-br from-gray-50/80 to-white/80 hover:border-border flex items-center justify-center transition-all duration-300 hover:shadow-lg p-4">
        {/* Live Loader Preview */}
        {renderLoaderPreview()}

        {/* New Badge */}
        {loader.isNew && (
          <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[9px] font-medium uppercase bg-foreground/90 text-background">
            New
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-3 bg-background/[0.97]">
          {/* Loader Info */}
          <div>
            <p className="text-sm font-semibold text-foreground">
              {loader.name}
            </p>
            <p className="text-xs capitalize mt-0.5 text-muted-foreground">
              {loader.category}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-1.5 justify-end">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(loader.id);
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

