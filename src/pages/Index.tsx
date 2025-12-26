import { useState, lazy, Suspense, useMemo, useCallback } from "react";
import { useBackgroundPattern } from "@/contexts/BackgroundPatternContext";
import { cn } from "@/lib/utils";

export type ViewType = "all" | "patterns" | "buttons";

// Grid Fade background style
const gridFadeStyle = {
  backgroundColor: '#fafafa',
  backgroundImage: 'linear-gradient(#00000015 1px, transparent 1px), linear-gradient(90deg, #00000015 1px, transparent 1px)',
  backgroundSize: '50px 50px'
};

// Lazy load components
const Header = lazy(() => 
  import("@/components/Header").then(module => ({ 
    default: module.Header 
  }))
);

const HeroSection = lazy(() => 
  import("@/components/HeroSection").then(module => ({ 
    default: module.HeroSection 
  }))
);

const PatternGrid = lazy(() => 
  import("@/components/PatternGrid").then(module => ({ 
    default: module.PatternGrid 
  }))
);

const ButtonGrid = lazy(() => 
  import("@/components/ButtonGrid").then(module => ({ 
    default: module.ButtonGrid 
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

// Loading skeleton
const PageSkeleton = () => (
  <div className="animate-pulse">
    <div className="border-b border-border">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="h-8 bg-muted rounded w-32 mb-2" />
        <div className="h-4 bg-muted rounded w-64" />
      </div>
    </div>
    <div className="container mx-auto px-4 md:px-6 py-6">
      <div className="flex gap-2 mb-8">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-8 bg-muted rounded w-20" />
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="aspect-square bg-muted rounded-lg" />
        ))}
      </div>
    </div>
  </div>
);

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeView, setActiveView] = useState<ViewType>("all");
  const { pattern, getPatternStyle } = useBackgroundPattern();

  const handleSearch = useMemo(() => setSearchQuery, []);

  const handleNavigate = useCallback((view: "patterns" | "buttons") => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Use preview pattern if active, otherwise use grid-fade as default
  const backgroundStyle = pattern ? getPatternStyle() : gridFadeStyle;

  return (
    <div 
      className="min-h-screen"
      style={backgroundStyle}
    >
      <Suspense fallback={
        <div className="h-14 fixed top-0 left-0 right-0 z-50 bg-background border-b border-border" />
      }>
        <Header 
          onSearch={handleSearch} 
          activeView={activeView}
          onViewChange={setActiveView}
        />
      </Suspense>

      <main className="pt-14 relative z-10">
        {activeView === "all" && (
          <Suspense fallback={<PageSkeleton />}>
            <HeroSection onNavigate={handleNavigate} />
          </Suspense>
        )}

        {activeView === "patterns" && (
          <Suspense fallback={<PageSkeleton />}>
            <PatternGrid searchQuery={searchQuery} />
          </Suspense>
        )}

        {activeView === "buttons" && (
          <Suspense fallback={<PageSkeleton />}>
            <ButtonGrid searchQuery={searchQuery} />
          </Suspense>
        )}

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
