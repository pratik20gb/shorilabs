import { lazy, Suspense } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { BackgroundPatternProvider } from "@/contexts/BackgroundPatternContext";
import { ModalProvider } from "@/contexts/ModalContext";

// Lazy load pages for better initial load
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
    <BackgroundPatternProvider>
      <ModalProvider>
        <TooltipProvider>
          {/* Keep Sonner loaded - toast needs to be available immediately */}
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={
                <Suspense fallback={
                  <div className="min-h-screen flex items-center justify-center bg-background">
                    <div className="text-sm text-muted-foreground animate-pulse">Loading...</div>
                  </div>
                }>
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
        </TooltipProvider>
      </ModalProvider>
    </BackgroundPatternProvider>
  </ThemeProvider>
);

export default App;
