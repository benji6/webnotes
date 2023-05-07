import * as Sentry from "@sentry/browser";

if (process.env.NODE_ENV === "production")
  Sentry.init({
    dsn: "https://7476a786f343436cb337a02c3c4f41bf@o4504114345017344.ingest.sentry.io/4505142315384832",
    // COMMIT_REF automatically supplied by Netlify https://docs.netlify.com/configure-builds/environment-variables/#git-metadata
    release: process.env.COMMIT_REF,
  });
