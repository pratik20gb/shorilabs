import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

export const Logo = ({ size = "md", showText = true, className }: LogoProps) => {
  const sizes = {
    sm: {
      icon: "w-6 h-6 text-xs",
      text: "text-base",
    },
    md: {
      icon: "w-8 h-8 text-sm",
      text: "text-lg",
    },
    lg: {
      icon: "w-12 h-12 text-lg",
      text: "text-2xl",
    },
  };

  return (
    <div className={cn("flex items-center", className)}>
      {/* Text */}
      {showText && (
        <span className={cn("font-bold text-foreground", sizes[size].text)}>
          shorilabs
        </span>
      )}
    </div>
  );
};

