import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Github, Menu, Terminal, X } from "lucide-react";

// X (formerly Twitter) logo component
const XLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { ViewType } from "@/pages/Index";
import { useModal } from "@/contexts/ModalContext";

interface HeaderProps {
  onSearch?: (query: string) => void;
  activeView?: ViewType;
  onViewChange?: (view: ViewType) => void;
}

export const Header = ({ onSearch, activeView = "all", onViewChange }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isModalOpen, closeModal } = useModal();

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
    { id: "all" as ViewType, label: "All" },
    { id: "patterns" as ViewType, label: "Patterns" },
    { id: "buttons" as ViewType, label: "Buttons" },
    { id: "cards" as ViewType, label: "Cards" },
    { id: "inputs" as ViewType, label: "Inputs" },
    { id: "badges" as ViewType, label: "Badges" },
    { id: "loaders" as ViewType, label: "Loaders" },
    { id: "avatars" as ViewType, label: "Avatars" },
    { id: "toggles" as ViewType, label: "Toggles" },
    { id: "dividers" as ViewType, label: "Dividers" },
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        isScrolled 
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
                      ? "text-foreground"
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
            {/* Mobile Close Modal Button - Only show when modal is open */}
            {isModalOpen && (
              <button
                onClick={closeModal}
                className="md:hidden p-2 rounded-md transition-colors text-foreground hover:bg-accent bg-accent/50"
                aria-label="Close Modal"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Search - Desktop */}
            {activeView !== "all" && !isModalOpen && (
              <div className="hidden lg:flex relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-9 pr-3 h-8 w-40 rounded-md text-sm border bg-transparent border-border placeholder:text-muted-foreground"
                />
              </div>
            )}

            {/* CLI */}
            {!isModalOpen && (
              <a
                href="https://www.npmjs.com/package/@shorilabs/cli"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md transition-colors text-muted-foreground hover:text-foreground hover:bg-accent"
                aria-label="CLI"
                title="Install via CLI"
              >
                <Terminal className="w-4 h-4" />
              </a>
            )}

            {/* GitHub */}
            {!isModalOpen && (
              <a
                href="https://github.com/pratik20gb/shorilabs"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md transition-colors text-muted-foreground hover:text-foreground hover:bg-accent"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}

            {/* X */}
            {!isModalOpen && (
              <a
                href="https://twitter.com/sage_pratik"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md transition-colors text-muted-foreground hover:text-foreground hover:bg-accent"
                aria-label="X"
              >
                <XLogo className="w-4 h-4" />
              </a>
            )}

            {/* Mobile Menu Toggle */}
            {!isModalOpen && (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-md transition-colors text-muted-foreground hover:text-foreground hover:bg-accent"
                aria-label="Menu"
              >
                <Menu className="w-4 h-4" />
              </button>
            )}
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
                      ? "text-foreground bg-accent"
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
