import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vite";
import packageJson from "./package.json";

const dependencies = Object.keys({
  ...packageJson.dependencies,
  ...packageJson.devDependencies,
});

const noExternal = process.env.NODE_ENV === "production" ? dependencies : [];

export default defineConfig({
  plugins: [tsconfigPaths()],
  build: {
    ssr: "./src/index.ts",
    outDir: "./dist",
  },
  ssr: {
    noExternal,
  },
});
