import { Github, Twitter, Package } from "lucide-react";
import { Logo } from "./Logo";
import { useBackgroundPattern } from "@/contexts/BackgroundPatternContext";
import { cn } from "@/lib/utils";

export const Footer = () => {
  const { isPreviewActive, mutedClass, brightness } = useBackgroundPattern();

  return (
    <footer className={cn(
      "py-12 border-t mt-16 relative z-10 transition-colors",
      isPreviewActive 
        ? brightness === "dark" ? "border-white/10" : "border-black/10"
        : "border-border/30"
    )}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo - h-6 (24px) for footer */}
          <Logo size="xs" variant="wordmark" />

          {/* Links */}
          <div className="flex items-center gap-1">
            <a
              href="https://www.npmjs.com/package/@shorilabs/patterns-cli"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "p-2 rounded-lg transition-colors",
                isPreviewActive 
                  ? brightness === "dark"
                    ? "text-white/60 hover:text-white hover:bg-white/10"
                    : "text-gray-600 hover:text-gray-900 hover:bg-black/5"
                  : "hover:bg-secondary/50 text-muted-foreground hover:text-foreground"
              )}
              aria-label="NPM Package"
              title="View on npm"
            >
              <Package className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/pratik20gb/shorilabs"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "p-2 rounded-lg transition-colors",
                isPreviewActive 
                  ? brightness === "dark"
                    ? "text-white/60 hover:text-white hover:bg-white/10"
                    : "text-gray-600 hover:text-gray-900 hover:bg-black/5"
                  : "hover:bg-secondary/50 text-muted-foreground hover:text-foreground"
              )}
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://twitter.com/sage_pratik"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "p-2 rounded-lg transition-colors",
                isPreviewActive 
                  ? brightness === "dark"
                    ? "text-white/60 hover:text-white hover:bg-white/10"
                    : "text-gray-600 hover:text-gray-900 hover:bg-black/5"
                  : "hover:bg-secondary/50 text-muted-foreground hover:text-foreground"
              )}
              aria-label="Twitter"
            >
              <Twitter className="w-4 h-4" />
            </a>
          </div>

          {/* Credits */}
          <div className="flex flex-col items-center md:items-end gap-1">
            <div className={cn(
              "text-sm transition-colors",
              isPreviewActive ? mutedClass : "text-muted-foreground"
            )}>
              © 2025 shorilabs
            </div>
            <div className={cn(
              "text-xs transition-colors",
              isPreviewActive 
                ? brightness === "dark" ? "text-white/50" : "text-gray-500"
                : "text-muted-foreground/70"
            )}>
              Made with <span className="text-red-400">❤️</span> by{" "}
              <a
                href="https://thepratik.xyz"
                className={cn(
                  "font-medium transition-colors underline decoration-dotted underline-offset-2",
                  isPreviewActive 
                    ? brightness === "dark"
                      ? "text-white/70 hover:text-white"
                      : "text-gray-700 hover:text-gray-900"
                    : "hover:text-foreground"
                )}
              >
                Pratik
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};