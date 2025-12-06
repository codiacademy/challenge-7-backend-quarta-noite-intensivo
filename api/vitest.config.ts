/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    setupFiles: [path.resolve(__dirname, "src/tests/setup.ts")],
    globals: true,
    environment: "node",
    coverage: {
      provider: "v8",
      reportsDirectory: "./coverage",
    },
    sequence: {
      concurrent: false,
    },
  },
});
