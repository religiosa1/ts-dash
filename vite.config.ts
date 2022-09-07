import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    dts({ insertTypesEntry: true }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "lib/index.js"),
      name: "ts-dash",
      formats: ['es', 'umd'],
      fileName: (format) => `${name}.${format}.js`,
    }
  }
});
