import "./sentry";
import "eri/dist/index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppState from "./components/AppState";
import Routes from "./components/App";
import { ErrorBoundary } from "@sentry/react";

const rootEl = document.getElementById("root");
if (!rootEl) throw Error("no root element");
createRoot(rootEl).render(
  <StrictMode>
    <AppState>
      <ErrorBoundary
        fallback={
          <p className="center">
            Oops something went wrong! The error should be reported
            automatically, but please do{" "}
            <a
              href="https://github.com/benji6/webnotes/issues"
              rel="noreferrer"
              target="_blank"
            >
              raise an issue on GitHub
            </a>{" "}
            to ensure it gets looked at.
          </p>
        }
      >
        <Routes />
      </ErrorBoundary>
    </AppState>
  </StrictMode>,
);

if (process.env.NODE_ENV === "production" && navigator.serviceWorker) {
  navigator.serviceWorker.register(
    new URL("service-worker.ts", import.meta.url),
    { type: "module" },
  );
}
