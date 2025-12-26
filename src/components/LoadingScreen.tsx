import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface LoadingScreenProps {
  isLoading: boolean;
}

export const LoadingScreen = ({ isLoading }: LoadingScreenProps) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "fixed inset-0 z-50 flex items-center justify-center",
            "bg-background/60 backdrop-blur-sm"
          )}
        >
          <div className="flex flex-col items-center gap-4">
            {/* Loading Animation */}
            <div className="relative w-16 h-16">
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-border"
              />
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-transparent border-t-foreground"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </div>

            {/* shorilabs Text */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xs font-medium text-muted-foreground tracking-wider"
            >
              shorilabs
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

