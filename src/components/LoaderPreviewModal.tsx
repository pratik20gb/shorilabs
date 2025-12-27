import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { Loader as LoaderType } from "@/data/loaders";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useModal } from "@/contexts/ModalContext";

interface LoaderPreviewModalProps {
  loader: LoaderType | null;
  onClose: () => void;
}

export const LoaderPreviewModal = ({
  loader,
  onClose,
}: LoaderPreviewModalProps) => {
  const [activeTab, setActiveTab] = useState<"css" | "tailwind">("css");
  const [copied, setCopied] = useState(false);
  const { openModal, closeModal } = useModal();

  useEffect(() => {
    if (loader) {
      openModal(onClose);
    } else {
      closeModal();
    }
  }, [loader, openModal, closeModal, onClose]);

  const handleClose = () => {
    closeModal();
    onClose();
  };

  if (!loader) return null;

  const copyToClipboard = async () => {
    const text = activeTab === "css" ? loader.css : loader.tailwind;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success(`${activeTab.toUpperCase()} copied!`);
    setTimeout(() => setCopied(false), 2000);
  };

  // Render loader preview based on category
  const renderLoaderPreview = (scale: number = 1) => {
    const category = loader.category;
    const sizeMultiplier = scale;
    
    if (category === "spinner") {
      return (
        <div 
          className="border-2 border-gray-200 border-t-blue-500 rounded-full animate-spin" 
          style={{ width: 32 * sizeMultiplier, height: 32 * sizeMultiplier }}
        />
      );
    }
    if (category === "dots") {
      return (
        <div className="flex gap-1">
          {[0, 1, 2].map(i => (
            <div 
              key={i}
              className="bg-blue-500 rounded-full animate-bounce" 
              style={{ 
                width: 8 * sizeMultiplier, 
                height: 8 * sizeMultiplier,
                animationDelay: `${i * 150}ms` 
              }}
            />
          ))}
        </div>
      );
    }
    if (category === "bars") {
      return (
        <div className="flex gap-0.5 items-end">
          {[4, 6, 5, 7].map((h, i) => (
            <div 
              key={i}
              className="bg-blue-500 rounded-sm animate-pulse" 
              style={{ 
                width: 4 * sizeMultiplier, 
                height: h * sizeMultiplier * 2,
                animationDelay: `${i * 150}ms` 
              }}
            />
          ))}
        </div>
      );
    }
    if (category === "pulse") {
      return (
        <div 
          className="bg-blue-500 rounded-full animate-ping" 
          style={{ width: 20 * sizeMultiplier, height: 20 * sizeMultiplier }}
        />
      );
    }
    if (category === "skeleton") {
      return (
        <div 
          className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse" 
          style={{ width: 100 * sizeMultiplier, height: 16 * sizeMultiplier }}
        />
      );
    }
    if (category === "progress") {
      return (
        <div 
          className="bg-gray-200 rounded-full overflow-hidden h-full sm:h-auto"
          style={{ width: 120 * sizeMultiplier, height: 6 * sizeMultiplier }}
        >
          <div className="h-full w-3/5 bg-blue-500 rounded-full animate-pulse" />
        </div>
      );
    }
    
    return (
      <div 
        className="border-2 border-gray-200 border-t-blue-500 rounded-full animate-spin" 
        style={{ width: 24 * sizeMultiplier, height: 24 * sizeMultiplier }}
      />
    );
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-background/80 backdrop-blur-md overflow-y-auto"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="relative w-full max-w-full sm:max-w-5xl my-0 sm:my-4 rounded-none sm:rounded-xl lg:rounded-2xl bg-card border-0 sm:border border-border shadow-2xl overflow-hidden h-full sm:h-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button - Hidden on mobile, shown on desktop */}
          <button
            onClick={handleClose}
            className="hidden md:flex absolute top-3 right-3 lg:top-6 lg:right-6 z-10 p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors bg-card/90 backdrop-blur-sm"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 h-full sm:h-auto">
            {/* Preview */}
            <div className="aspect-square lg:aspect-auto min-h-[200px] sm:min-h-[300px] lg:min-h-[500px] lg:border-r border-b lg:border-b-0 border-border bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-3 sm:p-4 lg:p-6 xl:p-8">
              {/* Loader Preview - Multiple sizes */}
              <div className="flex flex-col gap-3 sm:gap-4 lg:gap-6 overflow-y-auto sm:gap-8 lg:gap-12 items-center">
                {/* Large */}
                <div className="flex flex-col items-center gap-2 sm:gap-3 lg:gap-4">
                  <span className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wide">Large</span>
                  {renderLoaderPreview(1.5)}
                </div>

                {/* Normal */}
                <div className="flex flex-col items-center gap-2 sm:gap-3 lg:gap-4">
                  <span className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wide">Normal</span>
                  {renderLoaderPreview(1)}
                </div>

                {/* Small */}
                <div className="flex flex-col items-center gap-2 sm:gap-3 lg:gap-4">
                  <span className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wide">Small</span>
                  {renderLoaderPreview(0.75)}
                </div>
              </div>
            </div>

            {/* Code Panel */}
            <div className="flex flex-col p-3 sm:p-4 lg:p-6 xl:p-8 max-h-[calc(100vh-200px)] sm:max-h-[70vh] lg:max-h-none overflow-y-auto">
              {/* Header */}
              <div className="mb-4 sm:mb-6 lg:mb-8">
                <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">
                    {loader.name}
                  </h2>
                  {loader.isNew && (
                    <span className="px-2 py-0.5 rounded-md bg-foreground/90 text-background text-[10px] font-medium tracking-wide uppercase">
                      New
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground capitalize">
                  {loader.category}
                </p>
              </div>

              {/* Tabs */}
              <div className="flex gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                <button
                  className={cn(
                    "pill-button text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5",
                    activeTab === "css" ? "pill-button text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5-active" : "pill-button text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5-inactive"
                  )}
                  onClick={() => setActiveTab("css")}
                >
                  CSS
                </button>
                <button
                  className={cn(
                    "pill-button text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5",
                    activeTab === "tailwind" ? "pill-button text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5-active" : "pill-button text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5-inactive"
                  )}
                  onClick={() => setActiveTab("tailwind")}
                >
                  Tailwind
                </button>
              </div>

              {/* Code */}
              <div className="flex-1 overflow-auto mb-4 sm:mb-6">
                <pre className="p-2 sm:p-3 lg:p-4 rounded-lg bg-secondary/50 text-xs sm:text-sm font-mono text-foreground whitespace-pre-wrap leading-relaxed">
                  {activeTab === "css" ? loader.css : loader.tailwind}
                </pre>
              </div>

              {/* Usage Example */}
              <div className="mb-4 sm:mb-6 p-2 sm:p-3 lg:p-4 rounded-lg bg-secondary/30 border-0 sm:border border-border/50">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1 sm:mb-2">Usage</p>
                <pre className="text-xs sm:text-sm font-mono text-foreground">
{activeTab === "css" 
  ? `<div class="loader"></div>`
  : `<div className="${loader.tailwind}"></div>`
}
                </pre>
              </div>

              {/* Copy Button */}
              <button
                onClick={copyToClipboard}
                className="w-full py-2 sm:py-2.5 lg:py-3 rounded-lg bg-foreground text-background font-medium flex items-center justify-center gap-2 hover:bg-foreground/90 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy Code
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

