import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check, Code, Heart } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pattern } from "@/data/patterns";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { parsePatternCSS } from "@/lib/patternUtils";

interface PatternPreviewModalProps {
  pattern: Pattern | null;
  onClose: () => void;
}

export const PatternPreviewModal = ({
  pattern,
  onClose,
}: PatternPreviewModalProps) => {
  const [activeTab, setActiveTab] = useState<"css" | "tailwind">("css");
  const [copied, setCopied] = useState(false);

  if (!pattern) return null;

  const getPatternStyle = (): React.CSSProperties => {
    return parsePatternCSS(pattern.css);
  };

  const copyToClipboard = async () => {
    const text = activeTab === "css" ? pattern.css : pattern.tailwind;
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
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="relative w-full max-w-5xl rounded-2xl bg-card border border-border shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Content */}
          <div className="grid lg:grid-cols-2">
            {/* Preview */}
            <div
              className="aspect-square lg:aspect-auto lg:min-h-[600px] border-r border-border"
              style={getPatternStyle()}
            />

            {/* Code Panel */}
            <div className="flex flex-col p-8">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold text-foreground">
                    {pattern.name}
                  </h2>
                  {pattern.isNew && (
                    <span className="px-2 py-0.5 rounded-md bg-foreground/90 text-background text-[10px] font-medium tracking-wide uppercase">
                      New
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground capitalize">
                  {pattern.category}
                </p>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 mb-6">
                <button
                  className={cn(
                    "pill-button",
                    activeTab === "css" ? "pill-button-active" : "pill-button-inactive"
                  )}
                  onClick={() => setActiveTab("css")}
                >
                  CSS
                </button>
                <button
                  className={cn(
                    "pill-button",
                    activeTab === "tailwind" ? "pill-button-active" : "pill-button-inactive"
                  )}
                  onClick={() => setActiveTab("tailwind")}
                >
                  Tailwind
                </button>
              </div>

              {/* Code */}
              <div className="flex-1 overflow-auto mb-6">
                <pre className="p-4 rounded-lg bg-secondary/50 text-sm font-mono text-foreground whitespace-pre-wrap leading-relaxed">
                  {activeTab === "css" ? pattern.css : pattern.tailwind}
                </pre>
              </div>

              {/* Copy Button */}
              <button
                onClick={copyToClipboard}
                className="w-full py-3 rounded-lg bg-foreground text-background font-medium flex items-center justify-center gap-2 hover:bg-foreground/90 transition-colors"
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