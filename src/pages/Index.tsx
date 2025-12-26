import { useState } from "react";
import { Header } from "@/components/Header";
import { PatternGrid } from "@/components/PatternGrid";
import { CLISection } from "@/components/CLISection";
import { Footer } from "@/components/Footer";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background">
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