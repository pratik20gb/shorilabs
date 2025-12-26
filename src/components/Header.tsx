import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Github, X, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { useBackgroundPattern } from "@/contexts/BackgroundPatternContext";
import { toast } from "sonner";
import { ViewType } from "@/pages/Index";

interface HeaderProps {
  onSearch?: (query: string) => void;
  activeView?: ViewType;
  onViewChange?: (view: ViewType) => void;
}

export const Header = ({ onSearch, activeView = "all", onViewChange }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { 
    pattern: backgroundPattern, 
    setPattern: setBackgroundPattern,
    isPreviewActive,
    mutedClass,
    cardClass,
    brightness
  } = useBackgroundPattern();

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

  const navItems = [
    { id: "all" as ViewType, label: "Components" },
    { id: "patterns" as ViewType, label: "Patterns" },
    { id: "buttons" as ViewType, label: "Buttons" },
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        isPreviewActive
          ? cn(cardClass, "shadow-lg")
          : isScrolled 
            ? "bg-background/95 backdrop-blur-lg border-border shadow-sm" 
            : "bg-background border-border"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Left: Logo */}
          <div className="flex items-center gap-6">
            <Logo size="sm" variant="wordmark" />
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onViewChange?.(item.id)}
                  className={cn(
                    "px-3 py-1.5 text-sm font-medium transition-colors rounded-md",
                    activeView === item.id
                      ? isPreviewActive
                        ? brightness === "dark"
                          ? "text-white"
                          : "text-gray-900"
                        : "text-foreground"
                      : isPreviewActive
                        ? brightness === "dark"
                          ? "text-white/60 hover:text-white/80"
                          : "text-gray-500 hover:text-gray-700"
                        : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            {/* Search - Desktop */}
            {activeView !== "all" && (
              <div className="hidden lg:flex relative">
                <Search className={cn(
                  "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4",
                  isPreviewActive ? mutedClass : "text-muted-foreground"
                )} />
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className={cn(
                    "pl-9 pr-3 h-8 w-40 rounded-md text-sm border",
                    isPreviewActive 
                      ? brightness === "dark"
                        ? "bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        : "bg-black/5 border-black/10 text-gray-900 placeholder:text-gray-500"
                      : "bg-transparent border-border placeholder:text-muted-foreground"
                  )}
                />
              </div>
            )}

            {/* GitHub */}
            <a
              href="https://github.com/pratik20gb/shorilabs"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "p-2 rounded-md transition-colors",
                isPreviewActive 
                  ? brightness === "dark"
                    ? "text-white/60 hover:text-white"
                    : "text-gray-500 hover:text-gray-900"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
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
                  toast.success("Background cleared");
                }}
                className={cn(
                  "p-2 rounded-md transition-colors",
                  brightness === "dark"
                    ? "text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    : "text-red-500 hover:text-red-600 hover:bg-red-500/10"
                )}
                aria-label="Clear background"
                title="Clear preview"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                "md:hidden p-2 rounded-md transition-colors",
                isPreviewActive 
                  ? brightness === "dark"
                    ? "text-white/60 hover:text-white"
                    : "text-gray-500 hover:text-gray-900"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
              aria-label="Menu"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-3 border-t border-border"
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onViewChange?.(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={cn(
                    "px-3 py-2 text-sm font-medium transition-colors rounded-md text-left",
                    activeView === item.id
                      ? isPreviewActive
                        ? brightness === "dark"
                          ? "text-white bg-white/10"
                          : "text-gray-900 bg-black/5"
                        : "text-foreground bg-accent"
                      : isPreviewActive
                        ? brightness === "dark"
                          ? "text-white/60"
                          : "text-gray-500"
                        : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
};
