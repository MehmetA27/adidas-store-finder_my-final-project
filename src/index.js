import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";

const root = ReactDOM.createRoot(document.getElementById("root")); // id si root olan elementi sec
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
