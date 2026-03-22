import "./sentry";
import "eri/style.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppState from "./components/AppState";
import Routes from "./components/App";
import { ErrorBoundary } from "@sentry/react";
import { REPO_ISSUES_URL } from "./constants";

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
            <a href={REPO_ISSUES_URL} rel="noreferrer" target="_blank">
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

if (import.meta.env.PROD && navigator.serviceWorker) {
  navigator.serviceWorker.register("/service-worker.js", { type: "module" });
}
