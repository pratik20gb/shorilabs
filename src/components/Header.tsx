import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Github, Moon, Sun, Terminal, Heart, Sparkles, Package, User, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Logo } from "./Logo";
import { useBackgroundPattern } from "@/contexts/BackgroundPatternContext";
import { toast } from "sonner";

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export const Header = ({ onSearch }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { 
    pattern: backgroundPattern, 
    setPattern: setBackgroundPattern,
    isPreviewActive,
    textClass,
    mutedClass,
    cardClass,
    brightness
  } = useBackgroundPattern();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch?.(value);
  };

  const scrollToCLI = () => {
    const cliSection = document.getElementById('cli');
    cliSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToFavorites = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Trigger favorites filter
    const favButton = document.querySelector('[data-category="favorites"]') as HTMLButtonElement;
    setTimeout(() => favButton?.click(), 500);
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        isPreviewActive
          ? cn(cardClass, "shadow-lg")
          : isScrolled 
            ? "bg-background/95 backdrop-blur-lg border-border/50 shadow-sm" 
            : "bg-background/80 backdrop-blur-md border-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo - h-8 (32px) for header */}
          <Logo size="sm" variant="wordmark" />

          {/* Center Navigation - Hidden on mobile */}
          <nav className="hidden lg:flex items-center gap-2">
            <a
              href="#patterns"
              className={cn(
                "px-4 py-1.5 text-sm font-medium transition-colors rounded-lg",
                isPreviewActive 
                  ? cn(mutedClass, "hover:opacity-100") 
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              )}
            >
              <Sparkles className="w-3.5 h-3.5 inline mr-1.5" />
              Patterns
            </a>
            <button
              onClick={scrollToFavorites}
              className={cn(
                "px-4 py-1.5 text-sm font-medium transition-colors rounded-lg",
                isPreviewActive 
                  ? cn(mutedClass, "hover:opacity-100") 
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              )}
            >
              <Heart className="w-3.5 h-3.5 inline mr-1.5" />
              Favorites
            </button>
            <button
              onClick={scrollToCLI}
              className={cn(
                "px-4 py-1.5 text-sm font-medium transition-colors rounded-lg",
                isPreviewActive 
                  ? cn(mutedClass, "hover:opacity-100") 
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              )}
            >
              <Terminal className="w-3.5 h-3.5 inline mr-1.5" />
              CLI
            </button>
            <a
              href="https://thepratik.xyz"
              className={cn(
                "px-4 py-1.5 text-sm font-medium transition-colors rounded-lg",
                isPreviewActive 
                  ? cn(mutedClass, "hover:opacity-100") 
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              )}
            >
              Portfolio
            </a>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-1.5">
            {/* Search */}
            <div className="hidden md:flex relative">
              <Search className={cn(
                "absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5",
                isPreviewActive ? mutedClass : "text-muted-foreground"
              )} />
              <Input
                placeholder="Search patterns..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className={cn(
                  "pl-9 pr-3 h-9 w-52 rounded-lg text-sm focus-visible:ring-1",
                  isPreviewActive 
                    ? brightness === "dark"
                      ? cn("bg-white/10 border-white/20 text-white placeholder:text-white/50")
                      : cn("bg-black/5 border-black/10 text-gray-900 placeholder:text-gray-500")
                    : "bg-secondary/50 border border-border/50 focus-visible:ring-border/50 focus-visible:border-border placeholder:text-muted-foreground/50"
                )}
              />
            </div>

            {/* CLI Button - Mobile */}
            <button
              onClick={scrollToCLI}
              className={cn(
                "lg:hidden px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5",
                isPreviewActive
                  ? brightness === "dark"
                    ? "bg-white/20 text-white hover:bg-white/30"
                    : "bg-black/10 text-gray-900 hover:bg-black/15"
                  : "bg-foreground text-background hover:bg-foreground/90"
              )}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">CLI</span>
            </button>
            
            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  isPreviewActive 
                    ? cn(mutedClass, "hover:opacity-100") 
                    : "hover:bg-secondary/50 text-muted-foreground hover:text-foreground"
                )}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>
            )}

            {/* NPM */}
            <a
              href="https://www.npmjs.com/package/@shorilabs/patterns-cli"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "p-2 rounded-lg transition-colors",
                isPreviewActive 
                  ? cn(mutedClass, "hover:opacity-100") 
                  : "hover:bg-secondary/50 text-muted-foreground hover:text-foreground"
              )}
              aria-label="NPM Package"
              title="View on npm"
            >
              <Package className="w-4 h-4" />
            </a>

            {/* Portfolio */}
            <a
              href="https://thepratik.xyz"
              className={cn(
                "p-2 rounded-lg transition-colors",
                isPreviewActive 
                  ? cn(mutedClass, "hover:opacity-100") 
                  : "hover:bg-secondary/50 text-muted-foreground hover:text-foreground"
              )}
              aria-label="Portfolio"
              title="Visit Pratik's Portfolio"
            >
              <User className="w-4 h-4" />
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/pratik20gb/shorilabs"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "p-2 rounded-lg transition-colors",
                isPreviewActive 
                  ? cn(mutedClass, "hover:opacity-100") 
                  : "hover:bg-secondary/50 text-muted-foreground hover:text-foreground"
              )}
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>

            {/* Clear Background Pattern */}
            {backgroundPattern && (
              <button
                onClick={() => {
                  setBackgroundPattern(null);
                  toast.success("Background pattern cleared");
                }}
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  isPreviewActive
                    ? brightness === "dark"
                      ? "bg-red-500/20 text-red-300 hover:bg-red-500/30"
                      : "bg-red-500/10 text-red-600 hover:bg-red-500/20"
                    : "hover:bg-secondary/50 text-muted-foreground hover:text-foreground"
                )}
                aria-label="Clear background pattern"
                title="Clear background pattern"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};