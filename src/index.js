import React from "react";
import ReactDOM from "react-dom/client";  // ✅ Use createRoot in React 18+
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
