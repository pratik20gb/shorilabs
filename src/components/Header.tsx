import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Github, Moon, Sun, Terminal, Download, Heart, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Logo } from "./Logo";

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export const Header = ({ onSearch }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

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
        isScrolled 
          ? "bg-background/95 backdrop-blur-lg border-border/50 shadow-sm" 
          : "bg-background/80 backdrop-blur-md border-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Logo size="sm" />

          {/* Center Navigation - Hidden on mobile */}
          <nav className="hidden lg:flex items-center gap-2">
            <a
              href="#patterns"
              className="px-4 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary/50"
            >
              <Sparkles className="w-3.5 h-3.5 inline mr-1.5" />
              Patterns
            </a>
            <button
              onClick={scrollToFavorites}
              className="px-4 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary/50"
            >
              <Heart className="w-3.5 h-3.5 inline mr-1.5" />
              Favorites
            </button>
            <button
              onClick={scrollToCLI}
              className="px-4 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary/50"
            >
              <Terminal className="w-3.5 h-3.5 inline mr-1.5" />
              CLI
            </button>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-1.5">
            {/* Search */}
            <div className="hidden md:flex relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <Input
                placeholder="Search patterns..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-9 pr-3 h-9 w-52 rounded-lg bg-secondary/50 border border-border/50 text-sm focus-visible:ring-1 focus-visible:ring-border/50 focus-visible:border-border placeholder:text-muted-foreground/50"
              />
            </div>

            {/* CLI Button - Mobile */}
            <button
              onClick={scrollToCLI}
              className="lg:hidden px-3 py-1.5 rounded-lg bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors flex items-center gap-1.5"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">CLI</span>
            </button>
            
            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-lg hover:bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>
            )}

            {/* GitHub */}
            <a
              href="https://github.com/shorilabs/shorilabs"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </motion.header>
  );
};