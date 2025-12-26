import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center px-4">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="text-primary underline hover:text-primary/90 mb-8 inline-block">
          Return to Home
        </a>
        <div className="mt-8 pt-8 border-t border-border/30">
          <p className="text-sm text-muted-foreground/70">
            Built by{" "}
            <a
              href="https://thepratik.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:underline"
            >
              Pratik
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
