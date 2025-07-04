import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ContextShare from "./Components/ContextShare.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextShare>
      <BrowserRouter basename={import.meta.env.VITE_BASE_PATH}>
        <App />
      </BrowserRouter>
    </ContextShare>
  </React.StrictMode>
);
