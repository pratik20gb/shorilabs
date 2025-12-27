import { lazy, Suspense, useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { BackgroundPatternProvider } from "@/contexts/BackgroundPatternContext";
import { ModalProvider } from "@/contexts/ModalContext";
import { LoadingScreen } from "@/components/LoadingScreen";

// Lazy load pages for better initial load
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => {
  const [isAppLoading, setIsAppLoading] = useState(true);

  useEffect(() => {
    // Show loading screen while app initializes
    // This gives time for lazy-loaded components to start loading
    const timer = setTimeout(() => {
      setIsAppLoading(false);
    }, 1000); // Adjust timing as needed - allows content to start loading behind overlay

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <BackgroundPatternProvider>
        <ModalProvider>
          <TooltipProvider>
            {/* Keep Sonner loaded - toast needs to be available immediately */}
            <Sonner />
            <LoadingScreen isLoading={isAppLoading} />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={
                  <Suspense fallback={null}>
                    <Index />
                  </Suspense>
                } />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={
                  <Suspense fallback={null}>
                    <NotFound />
                  </Suspense>
                } />
              </Routes>
            </BrowserRouter>
            <Analytics />
          </TooltipProvider>
        </ModalProvider>
      </BackgroundPatternProvider>
    </ThemeProvider>
  );
};

export default App;
