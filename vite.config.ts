import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [solidPlugin()],
  base: '/ChordFinder2/', // <-- set this to your GitHub repo name
});