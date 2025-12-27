import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  isLoading: boolean;
  onLoadingComplete?: () => void;
}

export const LoadingScreen = ({ isLoading, onLoadingComplete }: LoadingScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!isLoading && isVisible) {
      // Delay hiding to allow fade out animation
      const timer = setTimeout(() => {
        setIsVisible(false);
        onLoadingComplete?.();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isLoading, isVisible, onLoadingComplete]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isLoading ? 1 : 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/70 backdrop-blur-sm"
        >
          {/* Loading Dots Animation */}
          <div className="relative flex flex-col items-center gap-4">
            <div className="flex items-center gap-2">
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  className="w-3 h-3 rounded-full bg-primary"
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.2,
                  }}
                />
              ))}
            </div>
            {/* Optional loading text */}
            <motion.p
              className="text-sm font-medium text-muted-foreground"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Loading
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

