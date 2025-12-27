import { useState, lazy, Suspense, useMemo, useCallback } from "react";
import { useModal } from "@/contexts/ModalContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export type ViewType = "all" | "patterns" | "buttons" | "cards" | "inputs" | "badges" | "loaders" | "avatars" | "toggles" | "dividers";

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

const CardGrid = lazy(() => 
  import("@/components/CardGrid").then(module => ({ 
    default: module.CardGrid 
  }))
);

const InputGrid = lazy(() => 
  import("@/components/InputGrid").then(module => ({ 
    default: module.InputGrid 
  }))
);

const BadgeGrid = lazy(() => 
  import("@/components/BadgeGrid").then(module => ({ 
    default: module.BadgeGrid 
  }))
);

const LoaderGrid = lazy(() => 
  import("@/components/LoaderGrid").then(module => ({ 
    default: module.LoaderGrid 
  }))
);

const AvatarGrid = lazy(() => 
  import("@/components/AvatarGrid").then(module => ({ 
    default: module.AvatarGrid 
  }))
);

const ToggleGrid = lazy(() => 
  import("@/components/ToggleGrid").then(module => ({ 
    default: module.ToggleGrid 
  }))
);

const DividerGrid = lazy(() => 
  import("@/components/DividerGrid").then(module => ({ 
    default: module.DividerGrid 
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
  const { closeModal } = useModal();

  const handleSearch = useMemo(() => setSearchQuery, []);

  const handleNavigate = useCallback((view: ViewType) => {
    closeModal();
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [closeModal]);

  const handleViewChange = useCallback((view: ViewType) => {
    closeModal();
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [closeModal]);

  return (
    <div 
      className="min-h-screen"
      style={gridFadeStyle}
    >
      <Suspense fallback={
        <div className="h-14 fixed top-0 left-0 right-0 z-50 bg-background border-b border-border" />
      }>
        <Header 
          onSearch={handleSearch} 
          activeView={activeView}
          onViewChange={handleViewChange}
        />
      </Suspense>

      <main className="pt-14 relative z-10">
        <ErrorBoundary>
          {activeView === "all" && (
            <Suspense key="all" fallback={<PageSkeleton />}>
              <HeroSection onNavigate={handleNavigate} />
            </Suspense>
          )}

          {activeView === "patterns" && (
            <Suspense key="patterns" fallback={<PageSkeleton />}>
              <PatternGrid searchQuery={searchQuery} />
            </Suspense>
          )}

          {activeView === "buttons" && (
            <Suspense key="buttons" fallback={<PageSkeleton />}>
              <ButtonGrid searchQuery={searchQuery} />
            </Suspense>
          )}

          {activeView === "cards" && (
            <Suspense key="cards" fallback={<PageSkeleton />}>
              <CardGrid searchQuery={searchQuery} />
            </Suspense>
          )}

          {activeView === "inputs" && (
            <Suspense key="inputs" fallback={<PageSkeleton />}>
              <InputGrid searchQuery={searchQuery} />
            </Suspense>
          )}

          {activeView === "badges" && (
            <Suspense key="badges" fallback={<PageSkeleton />}>
              <BadgeGrid searchQuery={searchQuery} />
            </Suspense>
          )}

          {activeView === "loaders" && (
            <Suspense key="loaders" fallback={<PageSkeleton />}>
              <LoaderGrid searchQuery={searchQuery} />
            </Suspense>
          )}

          {activeView === "avatars" && (
            <Suspense key="avatars" fallback={<PageSkeleton />}>
              <AvatarGrid searchQuery={searchQuery} />
            </Suspense>
          )}

          {activeView === "toggles" && (
            <Suspense key="toggles" fallback={<PageSkeleton />}>
              <ToggleGrid searchQuery={searchQuery} />
            </Suspense>
          )}

          {activeView === "dividers" && (
            <Suspense key="dividers" fallback={<PageSkeleton />}>
              <DividerGrid searchQuery={searchQuery} />
            </Suspense>
          )}

          <Suspense fallback={null}>
            <CLISection />
          </Suspense>
        </ErrorBoundary>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
