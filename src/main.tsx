import ReactDOM from "react-dom/client";
import App from "@/app/App";
import { AppProvider } from "@/app/providers/AppProvider";
import "@/shared/styles/index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("No se encontro el elemento #root.");
}

ReactDOM.createRoot(rootElement).render(
  <AppProvider>
    <App />
  </AppProvider>,
);
