import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div>
      <ul
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          listStyle: "none",
          padding: "5px 16px",
          margin: 0,
          textDecoration: "none",
        }}
      >
        <li onClick={() => window.location.reload()}
          style={{
            fontSize: "26px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Home
        </li>
        <li
          style={{
            margin: 0,
          }}
        >
          <h2
            style={{
              fontSize: "26px",
              margin: 0,
            }}
          >
            Multi-Agent Marketing Campaign Simulation
          </h2>
        </li>
      </ul>
    </div>
    <App />
  </StrictMode>
);
