import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { PatternGrid } from "@/components/PatternGrid";
import { CLISection } from "@/components/CLISection";
import { Footer } from "@/components/Footer";
import { LoadingScreen } from "@/components/LoadingScreen";

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
        <PatternGrid searchQuery={searchQuery} />
        <CLISection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;