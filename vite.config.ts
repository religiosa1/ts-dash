import { name } from "./package.json";
import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    dts({ insertTypesEntry: true }),
  ],
  build: {
    lib: {
      name,
      entry: resolve(__dirname, "src/index.ts"),
      formats: ['es', 'umd'],
      fileName: (format) => `index.${format}.js`,
    }
  }
});
