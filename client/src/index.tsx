import "eri/dist/index.css";
import * as ReactDOM from "react-dom";
import App from "./components/App";
import AppState from "./components/AppState";
import { EriProvider } from "eri";

ReactDOM.render(
  <EriProvider>
    <AppState>
      <App />
    </AppState>
  </EriProvider>,
  document.getElementById("root")
);

if (process.env.NODE_ENV === "production" && navigator.serviceWorker) {
  navigator.serviceWorker.register(
    new URL("service-worker.ts", import.meta.url),
    { type: "module" }
  );
}
