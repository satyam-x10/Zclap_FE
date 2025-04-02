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
          {availableModels.map((model) => (
            <button
              key={model}
              onClick={() => setSelectedModel(model)}
              style={{
                flex: "1",
                minWidth: "70px",
                padding: "10px 12px",
                borderRadius: "8px",
                border: "none",
                fontSize: "18px",
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
              }}
            >
              {model}
            </button>
          ))}
        </div>
      </div>
      <div style={{ marginTop: "16px" }}>
        {/* <label
          style={{
            display: "block",
            marginBottom: "8px",
            fontSize: "18px",
            color: "#aaa",
          }}
        >
          Add a New Role
        </label> */}

        {/* <div
          style={{
            position: "relative",
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              borderRadius: "8px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              paddingLeft: "12px",
              boxShadow: isSearchFocused
                ? "0 0 0 2px rgba(255, 255, 255, 0.1)"
                : "none",
              transition: "box-shadow 0.2s ease",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ opacity: 0.5 }}
            >
              <path
                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input
              ref={searchRef}
              type="text"
              placeholder="Search available roles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "transparent",
                color: "#fff",
                fontSize: "18px",
                border: "none",
                outline: "none",
              }}
            />
          </div>

          {search && filteredRoles.length > 0 && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                backgroundColor: "#1e1e1e",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                marginTop: "4px",
                maxHeight: "200px",
                overflowY: "auto",
                zIndex: 10,
                border: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              {filteredRoles.map((role) => (
                <div
                  key={role}
                  onClick={() => addAgent(role)}
                  style={{
                    padding: "10px 12px",
                    cursor: "pointer",
                    fontSize: "18px",
                    transition: "background-color 0.2s ease",
                    backgroundColor: agents.some((a) => a.role === role)
                      ? "rgba(255, 255, 255, 0.05)"
                      : "transparent",
                    color: agents.some((a) => a.role === role)
                      ? "#888"
                      : "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                  onMouseEnter={(e) => {
                    if (!agents.some((a) => a.role === role)) {
                      e.currentTarget.style.backgroundColor =
                        "rgba(255, 255, 255, 0.08)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!agents.some((a) => a.role === role)) {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }
                  }}
                >
                  {role}
                  {agents.some((a) => a.role === role) ? (
                    <span style={{ fontSize: "12px", color: "#888" }}>
                      Added
                    </span>
                  ) : (
                    <span
                      style={{
                        width: "16px",
                        height: "16px",
                        borderRadius: "50%",
                        backgroundColor: modelColors[selectedModel],
                        display: "inline-block",
                      }}
                    ></span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div> */}

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
                  marginBottom: "8px",
                  padding: "12px 16px",
                  backgroundColor: "rgba(255, 255, 255, 0.04)",
                  borderRadius: "8px",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                  transition: "all 0.2s ease",
                }}
              >
                <span
                  style={{
                    flex: "1",
                    fontSize: "18px",
                    fontWeight: "500",
                  }}
                >
                  {agent.role}
                </span>

                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <select
                    value={agent.model}
                    onChange={(e) => handleModelChange(agents.length - 1 - index, e.target.value)}
                    style={{
                      padding: "6px 10px",
                      borderRadius: "6px",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      fontSize: "18px",
                      backgroundColor: "rgba(0, 0, 0, 0.2)",
                      color: modelColors[agent.model],
                      backgroundColor: "black",
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
                      fontSize: "18px",
                    }}
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

     
    </div>
  );
};

export default AgentsForm;
