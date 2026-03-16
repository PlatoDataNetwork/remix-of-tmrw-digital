import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
    proxy: {
      // Proxy feed URLs to edge function in dev
      "^/[a-z][a-z0-9-]*\\.(json|xml)$": {
        target: "https://hxihntmxawwzeqvwbjfi.supabase.co",
        changeOrigin: true,
        rewrite: (path) => {
          const match = path.match(/^\/([a-z][a-z0-9-]*)\.(json|xml)$/);
          if (match) {
            return `/functions/v1/data-feed-proxy?vertical=${match[1]}&format=${match[2]}`;
          }
          return path;
        },
      },
      "^/api/[a-z]": {
        target: "https://hxihntmxawwzeqvwbjfi.supabase.co",
        changeOrigin: true,
        rewrite: (path) => {
          const vertical = path.replace("/api/", "");
          return `/functions/v1/data-feed-proxy?vertical=${vertical}&format=api`;
        },
      },
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
