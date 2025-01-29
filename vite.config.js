export default defineConfig({
  base: "/travel-API/",
  build: { target: "esnext" },
  plugins: [commonjs()],
});
