import { Github, Twitter, Heart } from "lucide-react";
import { Logo } from "./Logo";

export const Footer = () => {
  return (
    <footer className="py-12 border-t border-border/30 mt-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Logo size="sm" />

          {/* Links */}
          <div className="flex items-center gap-1">
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
          <div className="text-sm text-muted-foreground">
            © 2025 shorilabs
          </div>
        </div>
      </div>
    </footer>
  );
};