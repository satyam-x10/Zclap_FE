import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div style={{ backgroundColor: "#000" ,position: "fixed", top: 0, left: 0, right: 0 }}>
      <ul
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          listStyle: "none",
          padding: "5px 16px",
          margin: 0,
          textDecoration: "none",
          marginBottom: "25px",
        }}
      >
        <li
          onClick={() => window.location.reload()}
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
  </StrictMode>,
);
