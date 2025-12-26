import { useState, lazy, Suspense, useMemo } from "react";
import { useBackgroundPattern } from "@/contexts/BackgroundPatternContext";
import { cn } from "@/lib/utils";

// Lazy load all heavy components for better performance
const Header = lazy(() => 
  import("@/components/Header").then(module => ({ 
    default: module.Header 
  }))
);

const PatternGrid = lazy(() => 
  import("@/components/PatternGrid").then(module => ({ 
    default: module.PatternGrid 
  }))
);

const CLISection = lazy(() => 
  import("@/components/CLISection").then(module => ({ 
    default: module.CLISection 
  }))
);

const Footer = lazy(() => 
  import("@/components/Footer").then(module => ({ 
    default: module.Footer 
  }))
);

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { pattern, getPatternStyle } = useBackgroundPattern();

  // Memoize search handler to prevent re-renders
  const handleSearch = useMemo(() => setSearchQuery, []);

  return (
    <div 
      className={cn("min-h-screen", !pattern && "bg-background")}
      style={pattern ? getPatternStyle() : undefined}
    >
      <Suspense fallback={<div className="h-16 fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border" />}>
        <Header onSearch={handleSearch} />
      </Suspense>
      <main className="pt-16">
        <Suspense 
          fallback={
            <div className="min-h-[60vh] flex items-center justify-center py-20">
              <div className="text-muted-foreground text-sm animate-pulse">Loading patterns...</div>
            </div>
          }
        >
          <PatternGrid searchQuery={searchQuery} />
        </Suspense>
        <Suspense fallback={null}>
          <CLISection />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;