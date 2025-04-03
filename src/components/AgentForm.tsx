import React, { useState, useEffect, useRef } from "react";

const availableRoles = [
  "Content Writer",
  "Graphic Designer",
  "SEO Specialist",
  "Marketing Strategist",
  "Web Developer",
  "Social Media Manager",
  "UX Designer",
  "Data Analyst",
];

const availableModels = [
  "gemma2-9b-it",
  "llama-3.3-70b-versatile",
  "deepseek-r1-distill-llama-70b",
  "qwen-qwq-32b",
  "gemini-2.0-flash",
];

const modelColors = {
  "gemma2-9b-it": "#4285F4", // Google blue
  "llama-3.3-70b-versatile": "#EA4335", // Google red
  "deepseek-r1-distill-llama-70b": "#10A37F", // OpenAI green
  "qwen-qwq-32b": "#6B46C1", // Purple for Claude
  "gemini-2.0-flash": "#FBBF24", // Yellow for Gemini
};

const AgentsForm = ({ agents, setAgents }) => {
  const [selectedModel, setSelectedModel] = useState("gemma2-9b-it");
  const [search, setSearch] = useState("");
  const [filteredRoles, setFilteredRoles] = useState(availableRoles);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    setFilteredRoles(
      availableRoles.filter((role) =>
        role.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

  const handleModelChange = (index, model) => {
    const updatedAgents = [...agents];
    updatedAgents[index].model = model;
    setAgents(updatedAgents);
  };
  const [newRole, setNewRole] = useState("");

  const applyModelToAll = () => {
    setAgents(agents.map((agent) => ({ ...agent, model: selectedModel })));
  };

  const addAgent = (role) => {
    if (!agents.find((agent) => agent.role === role)) {
      setAgents([...agents, { role, model: selectedModel }]);
      setSearch("");
      searchRef.current.focus();
    }
  };

  const removeAgent = (index) => {
    const updatedAgents = [...agents];
    updatedAgents.splice(index, 1);
    setAgents(updatedAgents);
  };

  return (
    <div
      style={{
        backgroundColor: "#121212",
        color: "#f5f5f5",
        padding: "5px",
        borderRadius: "12px",
        margin: "5px",
        fontFamily: '"Inter", sans-serif',
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        minHeight: "60vh",
      }}
    >
      <div
        style={{
          fontSize: "34px",
          fontWeight: "700",
          marginBottom: "24px",
          textAlign: "center",
          padding: "4px 0",
          marginBottom: "16px",
          color: "#22674a",
        }}
      >
        AI Team Builder
      </div>

      <div style={{ marginBottom: "24px" }}>
        <label
          style={{
            display: "block",
            marginBottom: "8px",
            fontSize: "18px",
            color: "#aaa",
          }}
        >
          Select default Model for agenta Role
        </label>
        <div
          style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <div
  style={{
    display: "flex",
    gap: "8px",
    flexWrap: "wrap", // allow wrap on smaller screens
    justifyContent: "space-between",
  }}
>
  {availableModels.map((model) => (
    <button
      key={model}
      onClick={() => setSelectedModel(model)}
      style={{
        flex: "1 1 140px", // minimum size, will wrap if needed
        minWidth: "120px",
        padding: "clamp(6px, 2vw, 10px) clamp(8px, 3vw, 12px)",
        borderRadius: "8px",
        border: "none",
        fontSize: "clamp(14px, 2.5vw, 18px)",
        fontWeight: "500",
        backgroundColor:
          selectedModel === model
            ? modelColors[model]
            : "rgba(255, 255, 255, 0.06)",
        color: selectedModel === model ? "#fff" : "#ccc",
        cursor: "pointer",
        transition: "all 0.2s ease",
        boxShadow:
          selectedModel === model
            ? `0 2px 8px ${modelColors[model]}40`
            : "none",
        textAlign: "center",
        wordBreak: "break-word", // force wrap long text
      }}
    >
      {model}
    </button>
  ))}
</div>

        </div>
      </div>
      <div style={{ marginTop: "16px" }}>
        

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            marginTop: "12px",
            alignItems: "center",
          }}
        >
          {availableRoles.map((role) => (
            <button
              key={role}
              onClick={() => addAgent(role)}
              disabled={agents.some((agent) => agent.role === role)}
              style={{
                padding: "8px 12px",
                borderRadius: "6px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                fontSize: "18px",
                backgroundColor: agents.some((agent) => agent.role === role)
                  ? "rgba(255, 255, 255, 0.02)"
                  : "rgba(255, 255, 255, 0.06)",
                color: agents.some((agent) => agent.role === role)
                  ? "#666"
                  : "#eee",
                cursor: agents.some((agent) => agent.role === role)
                  ? "default"
                  : "pointer",
                transition: "all 0.2s ease",
                opacity: agents.some((agent) => agent.role === role) ? 0.5 : 1,
              }}
            >
              {role}
            </button>
          ))}

          {/* Input + Add Custom Role Button */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              backgroundColor: "#1a1a1a",
              padding: "6px 8px",
              borderRadius: "6px",
            }}
          >
            <input
              type="text"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              placeholder="Add role"
              style={{
                padding: "6px",
                borderRadius: "4px",
                border: "1px solid #333",
                backgroundColor: "#222",
                color: "#eee",
                fontSize: "16px",
                outline: "none",
                minWidth: "120px",
              }}
            />
            <button
              onClick={() => {
                const role = newRole.trim();
                if (role) {
                  addAgent(role);
                }
                setNewRole("");
              }}
              style={{
                backgroundColor: "beige",
                color: "black",
                padding: "6px 10px",
                borderRadius: "4px",
                fontWeight: "bold",
                fontSize: "18px",
                border: "none",
                cursor: "pointer",
              }}
            >
              +
            </button>
          </div>
        </div>
      </div>
      {agents.length === 0 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            fontSize: "18px",
            color: "#aaa",
            marginTop: "24px",
          }}
        >
          <span style={{ fontSize: "24px", fontWeight: "600" }}>
            No agents added yet.
          </span>
          <span style={{ marginLeft: "8px" }}>
            Start by seklecting a role above.
          </span>
        </div>
      )}

      {agents.length > 0 && (
        <div style={{ marginBottom: "24px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "12px",
            }}
          >
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "#eee",
              }}
            >
              Your Team ({agents.length})
            </h3>
            <button
              onClick={applyModelToAll}
              style={{
                padding: "8px 12px",
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                color: "#fff",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "18px",
                fontWeight: "500",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: modelColors[selectedModel],
                  display: "inline-block",
                }}
              ></span>
              Apply {selectedModel} to all
            </button>
          </div>

          <div
  style={{
    maxHeight: agents.length > 4 ? "300px" : "auto",
    overflowY: agents.length > 4 ? "auto" : "visible",
    paddingRight: agents.length > 4 ? "8px" : "0",
  }}
>
  {agents.slice().reverse().map((agent, index) => (
    <div
      key={index}
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: "0.5rem",
        padding: "0.75rem 1rem",
        backgroundColor: "rgba(255, 255, 255, 0.04)",
        borderRadius: "0.5rem",
        border: "1px solid rgba(255, 255, 255, 0.06)",
        transition: "all 0.2s ease",
        flexWrap: "wrap",
      }}
    >
      <span
        style={{
          flex: "1",
          fontSize: "1rem",
          fontWeight: "500",
          minWidth: "120px",
        }}
      >
        {agent.role}
      </span>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          marginTop: "0.5rem",
        }}
      >
        <select
          value={agent.model}
          onChange={(e) =>
            handleModelChange(agents.length - 1 - index, e.target.value)
          }
          style={{
            padding: "0.4rem 0.6rem",
            borderRadius: "0.375rem",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            fontSize: "1rem",
            backgroundColor: "black",
            color: modelColors[agent.model],
            cursor: "pointer",
            fontWeight: "500",
          }}
        >
          {availableModels.map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>

        <button
          onClick={() => removeAgent(index)}
          style={{
            width: "28px",
            height: "28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "6px",
            border: "none",
            backgroundColor: "rgba(255, 69, 58, 0.1)",
            color: "#ff4545",
            cursor: "pointer",
            fontSize: "1.1rem",
          }}
        >
          ×
        </button>
      </div>
    </div>
  ))}
</div>

<style>
  {`
    @media (max-width: 600px) {
      select {
        font-size: 0.875rem !important;
        padding: 0.3rem 0.5rem !important;
      }

      span {
        font-size: 0.9rem !important;
      }

      button {
        font-size: 1rem !important;
      }
    }
  `}
</style>

        </div>
      )}

     
    </div>
  );
};

export default AgentsForm;
