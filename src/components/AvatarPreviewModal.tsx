import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { Avatar as AvatarType } from "@/data/avatars";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useModal } from "@/contexts/ModalContext";

interface AvatarPreviewModalProps {
  avatar: AvatarType | null;
  onClose: () => void;
}

export const AvatarPreviewModal = ({
  avatar,
  onClose,
}: AvatarPreviewModalProps) => {
  const [activeTab, setActiveTab] = useState<"css" | "tailwind">("css");
  const [copied, setCopied] = useState(false);
  const { openModal, closeModal } = useModal();

  useEffect(() => {
    if (avatar) {
      openModal(onClose);
    } else {
      closeModal();
    }
  }, [avatar, openModal, closeModal, onClose]);

  const handleClose = () => {
    closeModal();
    onClose();
  };

  if (!avatar) return null;

  const copyToClipboard = async () => {
    const text = activeTab === "css" ? avatar.css : avatar.tailwind;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success(`${activeTab.toUpperCase()} copied!`);
    setTimeout(() => setCopied(false), 2000);
  };

  // Render avatar preview based on category and size
  const renderAvatarPreview = (size: "sm" | "md" | "lg") => {
    const category = avatar.category;
    const sizeClasses = {
      sm: "w-8 h-8",
      md: "w-12 h-12",
      lg: "w-16 h-16"
    };
    const baseClasses = cn("bg-gradient-to-br from-blue-400 to-purple-500", sizeClasses[size]);
    
    if (category === "circle" || category === "bordered") {
      return <div className={cn(baseClasses, "rounded-full")} />;
    }
    if (category === "rounded") {
      return <div className={cn(baseClasses, "rounded-xl")} />;
    }
    if (category === "ring") {
      return (
        <div className="p-0.5 rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
          <div className={cn(baseClasses, "rounded-full ring-2 ring-white")} />
        </div>
      );
    }
    if (category === "status") {
      const dotSizes = { sm: "w-2.5 h-2.5", md: "w-3.5 h-3.5", lg: "w-4 h-4" };
      return (
        <div className="relative">
          <div className={cn(baseClasses, "rounded-full")} />
          <div className={cn("absolute bottom-0 right-0 bg-emerald-500 rounded-full border-2 border-white", dotSizes[size])} />
        </div>
      );
    }
    if (category === "group") {
      const groupSizes = { sm: "w-7 h-7", md: "w-10 h-10", lg: "w-12 h-12" };
      return (
        <div className="flex -space-x-3">
          <div className={cn("rounded-full border-2 border-white bg-gradient-to-br from-blue-400 to-purple-500", groupSizes[size])} />
          <div className={cn("rounded-full border-2 border-white bg-gradient-to-br from-pink-400 to-red-500", groupSizes[size])} />
          <div className={cn("rounded-full border-2 border-white bg-gradient-to-br from-green-400 to-emerald-500", groupSizes[size])} />
        </div>
      );
    }
    
    return <div className={cn(baseClasses, "rounded-full")} />;
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
              {/* Avatar Preview - Multiple sizes */}
              <div className="flex flex-col gap-3 sm:gap-4 lg:gap-6 overflow-y-auto sm:gap-8 lg:gap-12 items-center">
                {/* Large */}
                <div className="flex flex-col items-center gap-2 sm:gap-3 lg:gap-4">
                  <span className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wide">Large</span>
                  {renderAvatarPreview("lg")}
                </div>

                {/* Normal */}
                <div className="flex flex-col items-center gap-2 sm:gap-3 lg:gap-4">
                  <span className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wide">Normal</span>
                  {renderAvatarPreview("md")}
                </div>

                {/* Small */}
                <div className="flex flex-col items-center gap-2 sm:gap-3 lg:gap-4">
                  <span className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wide">Small</span>
                  {renderAvatarPreview("sm")}
                </div>

                {/* In Context */}
                <div className="flex flex-col items-center gap-2 sm:gap-3 lg:gap-4">
                  <span className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wide">In Context</span>
                  <div className="flex items-center gap-2 sm:gap-3">
                    {renderAvatarPreview("md")}
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">John Doe</p>
                      <p className="text-[10px] sm:text-xs text-gray-500">@johndoe</p>
                    </div>
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
                    {avatar.name}
                  </h2>
                  {avatar.isNew && (
                    <span className="px-2 py-0.5 rounded-md bg-foreground/90 text-background text-[10px] font-medium tracking-wide uppercase">
                      New
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground capitalize">
                  {avatar.category}
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
                  {activeTab === "css" ? avatar.css : avatar.tailwind}
                </pre>
              </div>

              {/* Usage Example */}
              <div className="mb-4 sm:mb-6 p-2 sm:p-3 lg:p-4 rounded-lg bg-secondary/30 border-0 sm:border border-border/50">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1 sm:mb-2">Usage</p>
                <pre className="text-xs sm:text-sm font-mono text-foreground">
{activeTab === "css" 
  ? `<img src="avatar.jpg" class="avatar" alt="User" />`
  : `<img src="avatar.jpg" className="${avatar.tailwind}" alt="User" />`
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

