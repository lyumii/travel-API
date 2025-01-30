import { defineConfig } from "vite"; // ✅ Add this
export default defineConfig({
  base: "/travel-API/",
  build: { target: "esnext" },
});
