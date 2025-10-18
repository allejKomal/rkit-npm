import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "CommonUI",
      fileName: (format) => `rkit-ui.${format}.js`,
    },
    rollupOptions: {
      output: {
        manualChunks: undefined, // Disable code splitting
      },
      external: [
        "react",
        "react-dom",
        "@radix-ui/react-avatar",
        "@radix-ui/react-checkbox",
        "@radix-ui/react-collapsible",
        "@radix-ui/react-dialog",
        "@radix-ui/react-dropdown-menu",
        "@radix-ui/react-label",
        "@radix-ui/react-popover",
        "@radix-ui/react-select",
        "@radix-ui/react-separator",
        "@radix-ui/react-slot",
        "@radix-ui/react-switch",
        "@radix-ui/react-tooltip",
        "class-variance-authority",
        "clsx",
        "cmdk",
        "lucide-react",
        "react-router-dom",
        "tailwind-merge",
        "vaul",
      ],
    },
    sourcemap: true,
    minify: true,
  },
});
