import { readdir } from "fs/promises";
import { join, resolve } from "path";
import { defineConfig, build as viteBuild, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

const distPath = resolve(__dirname, "dist");
const ignoreSet = new Set(["index.html", "robots.txt", "service-worker.js"]);

async function listFilesRecursive(dir: string, base = ""): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const relativePath = base ? `${base}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      files.push(
        ...(await listFilesRecursive(join(dir, entry.name), relativePath)),
      );
    } else {
      files.push(relativePath);
    }
  }
  return files;
}

function serviceWorkerPlugin(): Plugin {
  return {
    name: "build-service-worker",
    apply: "build",
    async closeBundle() {
      const files = await listFilesRecursive(distPath);
      const filtered = files.filter(
        (f) => !(ignoreSet.has(f) || f.endsWith(".map")),
      );
      const cacheFirstCache = filtered.filter((f) => f.startsWith("assets/"));
      const networkFirstCache = [
        "/",
        ...filtered.filter((f) => !f.startsWith("assets/")),
      ];

      if (
        cacheFirstCache.some((resource) =>
          [
            "icon-without-css",
            "robots",
            "service-worker",
            "webmanifest",
            "index.html",
            "webmanifest",
            "service-worker",
            "favicon",
          ].some((word) => resource.includes(word)),
        ) ||
        cacheFirstCache.includes("/") ||
        cacheFirstCache.some((resource) => networkFirstCache.includes(resource))
      )
        throw Error("Check cache lists");

      await viteBuild({
        configFile: false,
        build: {
          emptyOutDir: false,
          outDir: "dist",
          rollupOptions: {
            input: resolve(__dirname, "src/service-worker.ts"),
            output: {
              entryFileNames: "service-worker.js",
              format: "es",
            },
          },
        },
        define: {
          "process.env.NODE_ENV": JSON.stringify("production"),
          "process.env.CACHE_FIRST_CACHE": JSON.stringify(
            cacheFirstCache.join(","),
          ),
          "process.env.NETWORK_FIRST_CACHE": JSON.stringify(
            networkFirstCache.join(","),
          ),
          "process.env.COMMIT_REF": JSON.stringify(
            process.env.COMMIT_REF ?? "",
          ),
          __SENTRY_BROWSER_BUNDLE__: "false",
          __SENTRY_DEBUG__: "false",
        },
      });
    },
  };
}

export default defineConfig({
  build: {
    target: "es2023",
    sourcemap: true,
  },
  define: {
    global: "globalThis",
    "process.env.BUILD_TIME": JSON.stringify(new Date().toISOString()),
    "process.env.COMMIT_REF": JSON.stringify(process.env.COMMIT_REF ?? ""),
    __SENTRY_BROWSER_BUNDLE__: "false",
    __SENTRY_DEBUG__: "false",
  },
  plugins: [react(), serviceWorkerPlugin()],
  server: {
    open: true,
    port: 1236,
    proxy: {
      "/api": {
        changeOrigin: true,
        target: "https://webnotes.link",
      },
    },
  },
});
