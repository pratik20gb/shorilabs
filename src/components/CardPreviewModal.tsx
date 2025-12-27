import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { Card as CardType } from "@/data/cards";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useModal } from "@/contexts/ModalContext";

interface CardPreviewModalProps {
  card: CardType | null;
  onClose: () => void;
}

export const CardPreviewModal = ({
  card,
  onClose,
}: CardPreviewModalProps) => {
  const [activeTab, setActiveTab] = useState<"css" | "tailwind">("css");
  const [copied, setCopied] = useState(false);
  const { openModal, closeModal } = useModal();

  useEffect(() => {
    if (card) {
      openModal(onClose);
    } else {
      closeModal();
    }
  }, [card, openModal, closeModal, onClose]);

  const handleClose = () => {
    closeModal();
    onClose();
  };

  if (!card) return null;

  // Parse CSS for card preview
  const getCardStyle = (): React.CSSProperties => {
    const style: React.CSSProperties = {};
    const lines = card.css.split('\n');
    lines.forEach(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('@') || trimmed.startsWith('}') || trimmed.startsWith('&')) return;
      const colonIndex = trimmed.indexOf(':');
      if (colonIndex === -1) return;
      const prop = trimmed.substring(0, colonIndex).trim();
      const value = trimmed.substring(colonIndex + 1).trim().replace(/;$/, '');
      const camelProp = prop.replace(/-([a-z])/g, (_, l) => l.toUpperCase());
      (style as Record<string, string>)[camelProp] = value;
    });
    return style;
  };

  const copyToClipboard = async () => {
    const text = activeTab === "css" ? card.css : card.tailwind;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success(`${activeTab.toUpperCase()} copied!`);
    setTimeout(() => setCopied(false), 2000);
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
            <div className="aspect-square lg:aspect-auto min-h-[200px] sm:min-h-[300px] lg:min-h-[500px] lg:border-r border-b lg:border-b-0 border-border bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-3 sm:p-4 lg:p-6 xl:p-8">
              {/* Card Preview - Multiple variations */}
              <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8 items-center w-full max-w-sm overflow-y-auto">
                {/* Large Card */}
                <div className="flex flex-col items-center gap-2 w-full">
                  <span className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wide">Card Preview</span>
                  <div 
                    style={getCardStyle()} 
                    className="w-full"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-10 h-10 rounded-full bg-current opacity-20"></div>
                        <div className="flex-1 space-y-1">
                          <div className="h-3 bg-current opacity-20 rounded w-24"></div>
                          <div className="h-2 bg-current opacity-10 rounded w-16"></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 bg-current opacity-10 rounded w-full"></div>
                        <div className="h-2 bg-current opacity-10 rounded w-5/6"></div>
                        <div className="h-2 bg-current opacity-10 rounded w-4/6"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card with Content */}
                <div className="flex flex-col items-center gap-2 w-full">
                  <span className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wide">With Content</span>
                  <div 
                    style={getCardStyle()} 
                    className="w-full"
                  >
                    <h3 className="font-semibold text-sm mb-1" style={{ color: 'inherit' }}>Card Title</h3>
                    <p className="text-xs opacity-70" style={{ color: 'inherit' }}>This is an example card with some content to show how it looks in use.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Code Panel */}
            <div className="flex flex-col p-3 sm:p-4 lg:p-6 xl:p-8 max-h-[calc(100vh-200px)] sm:max-h-[70vh] lg:max-h-none overflow-y-auto">
              {/* Header */}
              <div className="mb-4 sm:mb-6 lg:mb-8">
                <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">
                    {card.name}
                  </h2>
                  {card.isNew && (
                    <span className="px-2 py-0.5 rounded-md bg-foreground/90 text-background text-[10px] font-medium tracking-wide uppercase">
                      New
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground capitalize">
                  {card.category}
                </p>
              </div>

              {/* Tabs */}
              <div className="flex gap-1.5 sm:gap-2 mb-4 sm:mb-4 sm:mb-6">
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
                  {activeTab === "css" ? card.css : card.tailwind}
                </pre>
              </div>

              {/* Usage Example */}
              <div className="mb-4 sm:mb-6 p-2 sm:p-3 lg:p-4 rounded-lg bg-secondary/30 border-0 sm:border border-border/50">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1 sm:mb-2">Usage</p>
                <pre className="text-xs sm:text-sm font-mono text-foreground">
{activeTab === "css" 
  ? `<div class="card">Content</div>`
  : `<div className="${card.tailwind}">Content</div>`
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

