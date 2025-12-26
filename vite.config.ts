import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Code splitting optimization
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // React core
          if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
            return 'react-vendor';
          }
          // UI libraries
          if (id.includes('framer-motion')) {
            return 'framer-motion';
          }
          // Radix UI components
          if (id.includes('@radix-ui')) {
            return 'radix-ui';
          }
          // Utils
          if (id.includes('clsx') || id.includes('tailwind-merge') || id.includes('next-themes')) {
            return 'utils-vendor';
          }
          // Icons
          if (id.includes('lucide-react')) {
            return 'icons';
          }
          // Toast/Notifications
          if (id.includes('sonner') || id.includes('toaster')) {
            return 'notifications';
          }
        },
      },
    },
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
    // Source maps for production
    sourcemap: false,
    // Minification
    minify: 'esbuild',
    // CSS code splitting
    cssCodeSplit: true,
    // Target modern browsers for smaller bundles
    target: 'esnext',
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['@tanstack/react-query'], // Remove if not used
  },
});
