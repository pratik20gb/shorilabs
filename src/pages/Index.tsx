import { useState, useEffect, lazy, Suspense } from "react";
import { Header } from "@/components/Header";
import { CLISection } from "@/components/CLISection";
import { Footer } from "@/components/Footer";
import { LoadingScreen } from "@/components/LoadingScreen";

// Lazy load PatternGrid for better performance
const PatternGrid = lazy(() => 
  import("@/components/PatternGrid").then(module => ({ 
    default: module.PatternGrid 
  }))
);

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial page load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); // Show loading screen for 800ms

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <LoadingScreen isLoading={isLoading} />
      <Header onSearch={setSearchQuery} />
      <main className="pt-16">
        <Suspense 
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-muted-foreground">Loading patterns...</div>
            </div>
          }
        >
          <PatternGrid searchQuery={searchQuery} />
        </Suspense>
        <CLISection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;