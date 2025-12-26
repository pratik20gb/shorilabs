import { Github, Twitter, Heart, Package } from "lucide-react";
import { Logo } from "./Logo";

export const Footer = () => {
  return (
    <footer className="py-12 border-t border-border/30 mt-16 relative z-10">
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
              className="p-2 rounded-lg hover:bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="NPM Package"
              title="View on npm"
            >
              <Package className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/pratik20gb/shorilabs"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://twitter.com/sage_pratik"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-4 h-4" />
            </a>
          </div>

          {/* Credits */}
          <div className="flex flex-col items-center md:items-end gap-1">
            <div className="text-sm text-muted-foreground">
              © 2025 shorilabs
            </div>
            <div className="text-xs text-muted-foreground/70">
              Made with <span className="text-destructive">❤️</span> by{" "}
              <a
                href="https://thepratik.xyz"
                className="font-medium hover:text-foreground transition-colors underline decoration-dotted underline-offset-2"
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