import React, { useRef, useState } from "react";

// Clean CSS styles without Tailwind
const styles = {
  container: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    margin: "5px",
    padding: "5px",
    backgroundColor: "#111",
    color: "white",
    minHeight: "100vh",
    boxSizing: "border-box",
    width: "100%",
  },
  header: {
    backgroundColor: "#1a1a1a",
    borderRadius: "8px",
    padding: "20px",
    marginBottom: "20px",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.4)",
  },
  headerTitle: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#fff",
    margin: "0 0 8px 0",
  },
  headerSubtitle: {
    fontSize: "14px",
    color: "#9ca3af",
    margin: 0,
  },
  conversationWrapper: {
    display: "flex",
    gap: "20px",
  },
  sidebar: {
    width: "250px",
    flexShrink: 0,
  },
  teamPanel: {
    backgroundColor: "#1a1a1a",
    borderRadius: "8px",
    padding: "16px",
    marginBottom: "16px",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.4)",
  },
  panelTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#fff",
    marginTop: 0,
    marginBottom: "16px",
    display: "flex",
    alignItems: "center",
  },
  panelIcon: {
    marginRight: "8px",
    width: "18px",
    height: "18px",
    color: "#9ca3af",
  },
  memberList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  memberItem: {
    display: "flex",
    alignItems: "center",
    padding: "2px",
    borderRadius: "6px",
    marginBottom: "2px",
    backgroundColor: "#222",
  },
  memberAvatar: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    color: "white",
    marginRight: "12px",
    flexShrink: 0,
  },
  memberInfo: {
    overflow: "hidden",
  },
  memberName: {
    fontWeight: "500",
    fontSize: "14px",
    color: "#fff",
    margin: "0 0 1px 0",
  },
  memberRole: {
    fontSize: "12px",
    color: "#9ca3af",
    margin: 0,
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  mainContent: {
    flex: 1,
  },
  tabBar: {
    display: "flex",
    borderBottom: "1px solid #333",
    marginBottom: "16px",
  },
  tab: {
    padding: "12px 16px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    border: "none",
    background: "none",
    color: "#9ca3af",
  },
  activeTab: {
    borderBottom: "2px solid #3b82f6",
    color: "#3b82f6",
  },
  messagesContainer: {
    backgroundColor: "#1a1a1a",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.4)",
  },
  messageList: {
    padding: "20px",
    height: "500px",
    overflowY: "auto",
  },
  messageItem: {
    display: "flex",
    marginBottom: "24px",
  },
  messageAvatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: "16px",
    flexShrink: 0,
  },
  messageContent: {
    marginLeft: "16px",
    flex: 1,
  },
  messageHeader: {
    display: "flex",
    alignItems: "baseline",
    marginBottom: "6px",
  },
  messageName: {
    fontWeight: "600",
    fontSize: "15px",
    color: "#fff",
    margin: 0,
  },
  messageModel: {
    marginLeft: "8px",
    fontSize: "12px",
    padding: "2px 8px",
    backgroundColor: "#3b82f6",
    borderRadius: "12px",
    color: "white",
  },
  messageText: {
    fontSize: "14px",
    lineHeight: "1.5",
    color: "#d1d5db",
    margin: 0,
  },
  messageFooter: {
    display: "flex",
    alignItems: "center",
    padding: "12px 20px",
    backgroundColor: "#111",
    borderTop: "1px solid #333",
  },
  messageCount: {
    fontSize: "13px",
    color: "#9ca3af",
    marginRight: "auto",
  },
  buttonGroup: {
    display: "flex",
    gap: "8px",
  },
  buttonPrimary: {
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "8px 16px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
  },
  buttonSecondary: {
    backgroundColor: "#222",
    color: "#e5e7eb",
    border: "1px solid #444",
    borderRadius: "6px",
    padding: "8px 16px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
  },
  summaryContainer: {
    backgroundColor: "#1a1a1a",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.4)",
  },
  summaryTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#fff",
    margin: "0 0 16px 0",
  },
  summaryText: {
    fontSize: "14px",
    lineHeight: "1.6",
    color: "#d1d5db",
    margin: "0 0 20px 0",
  },
  keyPointsTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#fff",
    margin: "0 0 12px 0",
  },
  keyPointsList: {
    margin: "0 0 0 20px",
    padding: 0,
    color: "#9ca3af",
    fontSize: "14px",
    lineHeight: "1.6",
  },
  keyPointsItem: {
    marginBottom: "8px",
  },
  footer: {
    textAlign: "center",
    padding: "20px 0 0 0",
    fontSize: "13px",
    color: "#6b7280",
  },
};

const ConversationUI = ({ data }) => {
  const [activeTab, setActiveTab] = useState("conversation");

  // Get unique roles
  const uniqueRoles = [...new Set(data.map((item) => item.agent))];

  // Role colors, avatars, and descriptions
  const roleInfo = {
    "Content Writer": {
      color: "#10b981",
      avatar: "📝",
      description: "Develops compelling copy and messaging strategies",
    },
    "Graphic Designer": {
      color: "#3b82f6",
      avatar: "🎨",
      description: "Creates visual elements and design language",
    },
    "SEO Specialist": {
      color: "#fbbf24",
      avatar: "🔍",
      description: "Optimizes content for search engines",
    },
    "Marketing Strategist": {
      color: "#9333ea",
      avatar: "📈",
      description: "Plans and executes marketing campaigns",
    },
    "Web Developer": {
      color: "#ef4444",
      avatar: "💻",
      description: "Builds and maintains websites",
    },
    "Social Media Manager": {
      color: "#f97316",
      avatar: "📱",
      description: "Manages social media platforms and engagement",
    },
    "UX Designer": {
      color: "#6366f1",
      avatar: "🖌️",
      description: "Designs user experiences and interfaces",
    },
    "Data Analyst": {
      color: "#4ade80",
      avatar: "📊",
      description: "Analyzes data to inform business decisions",
    },
  };

  // Function to render formatted messages
  const renderFormattedText = (text) => {
    // Parse bold text
    let formattedText = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // Parse italic text
    formattedText = formattedText.replace(/\*(.*?)\*/g, "<em>$1</em>");

    // Parse bullet points
    formattedText = formattedText.replace(/^\s*\*\s+(.*?)$/gm, "<li>$1</li>");
    formattedText = formattedText.replace(
      /<li>(.*?)<\/li>/g,
      '<ul style="margin-left: 20px; margin-top: 8px; margin-bottom: 8px;">$&</ul>',
    );

    // Handle line breaks
    formattedText = formattedText.replace(/\n\n/g, "<br/><br/>");

    return <div dangerouslySetInnerHTML={{ __html: formattedText }} />;
  };

  const printRef = useRef(null);

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const win = window.open("", "", "width=900,height=700");
    win.document.write(`
      <html>
        <head>
          <title>Conversation Print</title>
          <style>
            body {
              font-family: sans-serif;
              padding: 20px;
            }
            h3 {
              margin: 0;
            }
            .message {
              margin-bottom: 16px;
              display: flex;
              gap: 12px;
            }
            .avatar {
              width: 40px;
              height: 40px;
              border-radius: 50%;
              flex-shrink: 0;
            }
            .content {
              flex: 1;
            }
          </style>
        </head>
        <body>
          ${printContents}
        </body>
      </html>
    `);
    win.document.close();
    win.focus();
    win.print();
    win.close();
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>Team Conversation</h1>
        <p style={styles.headerSubtitle}>
          Collaborative discussion between team members
        </p>
      </header>

      {/* Main content */}
      <div style={styles.conversationWrapper}>
        {/* Sidebar with team members */}
        <aside style={styles.sidebar}>
          <div style={styles.teamPanel}>
            <h2 style={styles.panelTitle}>
              <svg
                style={styles.panelIcon}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              Team Members
            </h2>

            <ul style={styles.memberList}>
              {uniqueRoles.map((role) => (
                <li key={role} style={styles.memberItem}>
                  <div
                    style={{
                      ...styles.memberAvatar,
                      backgroundColor: roleInfo[role]?.color,
                    }}
                  >
                    {roleInfo[role]?.avatar}
                  </div>
                  <div style={styles.memberInfo}>
                    <h3 style={styles.memberName}>{role}</h3>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main content area */}
        <div style={styles.mainContent}>
          {/* Tabs */}
          <div style={styles.tabBar}>
            <button
              onClick={() => setActiveTab("conversation")}
              style={{
                ...styles.tab,
                ...(activeTab === "conversation" ? styles.activeTab : {}),
              }}
            >
              Conversation
            </button>
            <button
              onClick={() => setActiveTab("summary")}
              style={{
                ...styles.tab,
                ...(activeTab === "summary" ? styles.activeTab : {}),
              }}
            >
              Summary
            </button>
          </div>
          {/* Footer controls */}
          <div style={styles.messageFooter}>
            <span style={styles.messageCount}>{data.length} messages</span>
            <div style={styles.buttonGroup}>
              <button onClick={handlePrint} style={styles.buttonSecondary}>
                Print Page
              </button>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(printRef.current.innerText);
                  alert("Conversation copied to clipboard!");
                }}
                style={styles.buttonPrimary}
              >
                Copy
              </button>
            </div>
          </div>

          {/* Conversation tab */}
          {activeTab === "conversation" && (
            <div style={styles.messagesContainer}>
              {/* Messages */}
              <div ref={printRef} style={styles.messageList}>
                {data.map((message, index) => (
                  <div key={index} style={styles.messageItem}>
                    <div
                      style={{
                        ...styles.messageAvatar,
                        backgroundColor: roleInfo[message.agent]?.color,
                      }}
                    >
                      {roleInfo[message.agent]?.avatar}
                    </div>
                    <div style={styles.messageContent}>
                      <div style={styles.messageHeader}>
                        <h3 style={styles.messageName}>{message.agent}</h3>
                        <span style={styles.messageModel}>{message.model}</span>
                      </div>
                      <div style={styles.messageText}>
                        {renderFormattedText(message.message)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Summary tab */}
          {activeTab === "summary" && (
            <div style={styles.summaryContainer}>
              <h2 style={styles.summaryTitle}>Conversation Summary</h2>
              <p style={styles.summaryText}>
                This is a conversation between {uniqueRoles.join(" and ")}{" "}
                discussing project collaboration.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationUI;
