import "./sentry";
import "eri/dist/index.css";
import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import AppState from "./components/AppState";
import Routes from "./components/App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppState>
      <Routes />
    </AppState>
  </StrictMode>,
);

if (process.env.NODE_ENV === "production" && navigator.serviceWorker) {
  navigator.serviceWorker.register(
    new URL("service-worker.ts", import.meta.url),
    { type: "module" },
  );
}
