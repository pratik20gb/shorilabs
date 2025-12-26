import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useBackgroundPattern } from "@/contexts/BackgroundPatternContext";

interface LogoProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  className?: string;
  variant?: "wordmark" | "icon";
}

export const Logo = ({ size = "md", showText = false, className, variant = "wordmark" }: LogoProps) => {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { isPreviewActive, brightness } = useBackgroundPattern();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Wordmark logo sizes (maintain aspect ratio ~4.67:1)
  const wordmarkSizes = {
    xs: "h-6",      // 24px - Footer, mobile
    sm: "h-8",      // 32px - Header (default)
    md: "h-10",     // 40px - Medium
    lg: "h-16",     // 64px - Hero section
    xl: "h-20",     // 80px - Large hero
  };

  // Icon sizes (square 1:1)
  const iconSizes = {
    xs: "w-4 h-4",  // 16px
    sm: "w-6 h-6",  // 24px - Mobile header
    md: "w-8 h-8",  // 32px
    lg: "w-12 h-12", // 48px
    xl: "w-16 h-16", // 64px
  };

  // Determine which logo to use based on theme and pattern preview
  const currentTheme = mounted ? (resolvedTheme || theme) : "light";
  
  // When previewing a pattern, use the appropriate logo based on brightness
  // Dark patterns need dark logo (white text), light patterns need regular logo (dark text)
  const getLogoSrc = () => {
    if (variant === "icon") return "/icon-green.svg";
    
    if (isPreviewActive) {
      // For pattern preview, use brightness to determine logo
      return brightness === "light" ? "/logo-green.svg" : "/logo-green-dark.svg";
    }
    
    // Normal theme-based selection
    return currentTheme === "dark" ? "/logo-green-dark.svg" : "/logo-green.svg";
  };
  
  const logoSrc = getLogoSrc();

  const sizeClass = variant === "icon" 
    ? iconSizes[size] 
    : wordmarkSizes[size];

  return (
    <a 
      href="/" 
      className={cn("flex items-center hover:opacity-80 transition-opacity", showText && "gap-2", className)}
      aria-label="shorilabs home"
    >
      {/* Logo Image */}
      <img 
        src={logoSrc} 
        alt="shorilabs logo" 
        className={cn(sizeClass, variant === "wordmark" && "w-auto")}
      />
      {/* Text */}
      {showText && (
        <span className={cn("font-bold text-foreground", size === "xs" ? "text-sm" : size === "sm" ? "text-base" : size === "md" ? "text-lg" : "text-xl")}>
          shorilabs
        </span>
      )}
    </a>
  );
};

