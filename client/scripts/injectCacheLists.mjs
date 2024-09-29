import path from "path";
import { promises as fs } from "fs";
import { fileURLToPath } from "url";

const ignoreSet = new Set(["index.html", "robots.txt", "service-worker.js"]);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const buildPath = path.join(__dirname, "..", "dist");

(async () => {
  const files = await fs.readdir(buildPath);
  const filteredFiles = files.filter(
    (file) => !(ignoreSet.has(file) || file.endsWith(".map")),
  );
  const networkFirstCache = ["/"];
  const cacheFirstCache = [];
  for (const file of filteredFiles) {
    if (/^.+\..{8}\..{2,5}$/.test(file)) cacheFirstCache.push(file);
    else networkFirstCache.push(file);
  }

  // These checks are intentionally paranoid
  if (
    cacheFirstCache.some((resource) =>
      ["icon-without-css", "robots", "service-worker", "webmanifest"].some(
        (word) => resource.includes(word),
      ),
    ) ||
    cacheFirstCache.includes("/") ||
    cacheFirstCache.some((resource) => networkFirstCache.includes(resource))
  )
    throw Error("Check cache lists");

  const serviceWorkerPath = path.join(buildPath, "service-worker.js");
  const serviceWorker = await fs.readFile(serviceWorkerPath, "utf-8");
  return fs.writeFile(
    serviceWorkerPath,
    serviceWorker
      .replace("CACHE_FIRST_CACHE", cacheFirstCache)
      .replace("NETWORK_FIRST_CACHE", networkFirstCache),
  );
})();
