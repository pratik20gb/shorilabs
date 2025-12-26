import { Github, Twitter } from "lucide-react";
import { useBackgroundPattern } from "@/contexts/BackgroundPatternContext";
import { cn } from "@/lib/utils";

export const Footer = () => {
  const { isPreviewActive, mutedClass, brightness } = useBackgroundPattern();

  return (
    <footer className={cn(
      "py-6 border-t relative z-10 transition-colors",
      isPreviewActive 
        ? brightness === "dark" ? "border-white/10" : "border-black/10"
        : "border-border"
    )}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className={cn(
            "text-sm transition-colors",
            isPreviewActive ? mutedClass : "text-muted-foreground"
          )}>
            Built by{" "}
            <a
              href="https://thepratik.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "font-medium underline underline-offset-4 transition-colors",
                isPreviewActive 
                  ? brightness === "dark"
                    ? "text-white/80 hover:text-white"
                    : "text-gray-700 hover:text-gray-900"
                  : "text-foreground hover:text-foreground/80"
              )}
            >
              Pratik
            </a>
            . The source code is available on{" "}
            <a
              href="https://github.com/pratik20gb/shorilabs"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "font-medium underline underline-offset-4 transition-colors",
                isPreviewActive 
                  ? brightness === "dark"
                    ? "text-white/80 hover:text-white"
                    : "text-gray-700 hover:text-gray-900"
                  : "text-foreground hover:text-foreground/80"
              )}
            >
              GitHub
            </a>
            .
          </p>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/pratik20gb/shorilabs"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "transition-colors",
                isPreviewActive 
                  ? brightness === "dark"
                    ? "text-white/60 hover:text-white"
                    : "text-gray-500 hover:text-gray-900"
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com/sage_pratik"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "transition-colors",
                isPreviewActive 
                  ? brightness === "dark"
                    ? "text-white/60 hover:text-white"
                    : "text-gray-500 hover:text-gray-900"
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
