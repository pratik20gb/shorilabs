import { motion } from "framer-motion";

interface PatternSkeletonProps {
  index?: number;
}

export const PatternSkeleton = ({ index = 0 }: PatternSkeletonProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      className="aspect-square rounded-xl overflow-hidden border border-border/40 bg-secondary/30"
    >
      {/* Animated shimmer effect */}
      <div className="relative h-full w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/50 to-transparent animate-shimmer" />
        <div className="h-full w-full bg-secondary/20" />
      </div>
    </motion.div>
  );
};

