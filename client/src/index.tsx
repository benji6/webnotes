import "eri/dist/index.css";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";
import AppState from "./components/AppState";

ReactDOM.render(
  <BrowserRouter>
    <AppState>
      <App />
    </AppState>
  </BrowserRouter>,
  document.getElementById("root")
);

if (process.env.NODE_ENV === "production" && navigator.serviceWorker) {
  navigator.serviceWorker.register(
    new URL("service-worker.ts", import.meta.url),
    { type: "module" }
  );
}
