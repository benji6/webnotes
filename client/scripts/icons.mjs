import favicons from "favicons";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicPath = path.join(__dirname, "..", "public");
const source = path.join(publicPath, "icon.svg");

const configuration = {
  online: false,
  preferOnline: false,
  icons: {
    android: true,
    appleIcon: true,
    appleStartup: false,
    coast: false,
    favicons: true,
    firefox: false,
    windows: false,
    yandex: false,
  },
};

favicons(source, configuration, (err, response) => {
  if (err) throw err;

  response.images
    .filter(({ name }) =>
      [
        "android-chrome-192x192.png",
        "android-chrome-512x512.png",
        "apple-touch-icon.png",
        "favicon.ico",
      ].includes(name),
    )
    .map(({ contents, name }) => ({
      contents,
      name: name.replace("android-chrome", "icon"),
    }))
    .forEach(({ contents, name }) =>
      fs.writeFile(path.join(publicPath, name), contents),
    );
});
