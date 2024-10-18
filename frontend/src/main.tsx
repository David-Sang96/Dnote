import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthContextProvider } from "./contexts/authContext.tsx";
import "./index.css";
import Router from "./routes/Router.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  </StrictMode>,
);
