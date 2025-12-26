import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check } from "lucide-react";
import { useState } from "react";
import { Button as ButtonType } from "@/data/buttons";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ButtonPreviewModalProps {
  button: ButtonType | null;
  onClose: () => void;
}

export const ButtonPreviewModal = ({
  button,
  onClose,
}: ButtonPreviewModalProps) => {
  const [activeTab, setActiveTab] = useState<"css" | "tailwind">("css");
  const [copied, setCopied] = useState(false);

  if (!button) return null;

  // Parse CSS for button preview
  const getButtonStyle = (): React.CSSProperties => {
    const style: React.CSSProperties = {};
    const lines = button.css.split('\n');
    lines.forEach(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('@') || trimmed.startsWith('}')) return;
      const colonIndex = trimmed.indexOf(':');
      if (colonIndex === -1) return;
      const prop = trimmed.substring(0, colonIndex).trim();
      let value = trimmed.substring(colonIndex + 1).trim().replace(/;$/, '');
      const camelProp = prop.replace(/-([a-z])/g, (_, l) => l.toUpperCase());
      (style as Record<string, string>)[camelProp] = value;
    });
    return style;
  };

  const copyToClipboard = async () => {
    const text = activeTab === "css" ? button.css : button.tailwind;
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
            <div className="aspect-square lg:aspect-auto lg:min-h-[600px] border-r border-border bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-8">
              {/* Button Preview - Multiple sizes */}
              <div className="flex flex-col gap-6 items-center">
                {/* Large */}
                <div className="flex flex-col items-center gap-2">
                  <span className="text-xs text-gray-500 uppercase tracking-wide">Large</span>
                  <button 
                    style={{ ...getButtonStyle(), transform: 'scale(1.2)' }} 
                    className="pointer-events-none"
                  >
                    {button.label || "Button"}
                  </button>
                </div>
                
                {/* Normal */}
                <div className="flex flex-col items-center gap-2">
                  <span className="text-xs text-gray-500 uppercase tracking-wide">Normal</span>
                  <button 
                    style={getButtonStyle()} 
                    className="pointer-events-none"
                  >
                    {button.label || "Button"}
                  </button>
                </div>
                
                {/* Small */}
                <div className="flex flex-col items-center gap-2">
                  <span className="text-xs text-gray-500 uppercase tracking-wide">Small</span>
                  <button 
                    style={{ ...getButtonStyle(), transform: 'scale(0.85)', fontSize: '0.875rem', padding: '8px 16px' }} 
                    className="pointer-events-none"
                  >
                    {button.label || "Button"}
                  </button>
                </div>

                {/* Button Group Example */}
                <div className="flex flex-col items-center gap-2 mt-4">
                  <span className="text-xs text-gray-500 uppercase tracking-wide">Group</span>
                  <div className="flex gap-2">
                    <button 
                      style={getButtonStyle()} 
                      className="pointer-events-none"
                    >
                      Save
                    </button>
                    <button 
                      style={getButtonStyle()} 
                      className="pointer-events-none opacity-70"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Code Panel */}
            <div className="flex flex-col p-8">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold text-foreground">
                    {button.name}
                  </h2>
                  {button.isNew && (
                    <span className="px-2 py-0.5 rounded-md bg-foreground/90 text-background text-[10px] font-medium tracking-wide uppercase">
                      New
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground capitalize">
                  {button.category}
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
                  {activeTab === "css" ? button.css : button.tailwind}
                </pre>
              </div>

              {/* Usage Example */}
              <div className="mb-6 p-4 rounded-lg bg-secondary/30 border border-border/50">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Usage</p>
                <pre className="text-sm font-mono text-foreground">
{activeTab === "css" 
  ? `<button class="my-button">${button.label || "Button"}</button>`
  : `<button className="${button.tailwind}">${button.label || "Button"}</button>`
}
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

