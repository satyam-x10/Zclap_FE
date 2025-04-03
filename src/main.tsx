import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <nav
      style={{
        backgroundColor: "#000",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        color: "rgb(153 178 206)",
        padding: "10px 16px",
        zIndex: 1000,
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)"
      }}
    >
      <div
        className="top-navbar"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "8px 0",
          margin: 0,
          maxWidth: "1200px",
          marginLeft: "auto",
          marginRight: "auto",
          width: "100%"
        }}
      >
        <div
          onClick={() => window.location.reload()}
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            cursor: "pointer",
            padding: "8px 12px",
            borderRadius: "6px",
            transition: "background-color 0.3s",
            userSelect: "none"
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#111"}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}
        >
          Home
        </div>
        <h1
          style={{
            fontSize: "22px",
            margin: 0,
            fontWeight: "bold",
            padding: "0 10px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}
        >
          Multi-Agent Marketing Campaign Simulation
        </h1>
      </div>
    </nav>
    <div style={{ paddingTop: "70px" }}>
      <App />
    </div>
  </StrictMode>
);