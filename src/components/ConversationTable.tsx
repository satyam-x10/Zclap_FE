import React, { useRef, useState, useEffect } from "react";

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
    fontSize: "18px",
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
    fontSize: "18px",
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
    fontSize: "18px",
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
    fontSize: "18px",
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
    fontSize: "18px",
    fontWeight: "500",
    cursor: "pointer",
  },
  buttonSecondary: {
    backgroundColor: "#222",
    color: "#e5e7eb",
    border: "1px solid #444",
    borderRadius: "6px",
    padding: "8px 16px",
    fontSize: "18px",
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
    fontSize: "18px",
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
    fontSize: "18px",
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

const ConversationUI = ({ data,summary }) => {
  const [activeTab, setActiveTab] = useState("conversation");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentSpeakingIndex, setCurrentSpeakingIndex] = useState(-1);
  const [highlightedWords, setHighlightedWords] = useState([]);

  // Reference to store speech synthesis utterances
  const utteranceRef = useRef(null);

  // Get unique roles
  const uniqueRoles = [...new Set(data.map((item) => item.agent))];

  // Role colors, avatars, descriptions, and voice settings
  const roleInfo = {
    "Content Writer": {
      color: "#10b981",
      avatar: "📝",
      description: "Develops compelling copy and messaging strategies",
      voice: {
        voiceIndex: 0, // Will be assigned dynamically
        pitch: 1,
        rate: 1,
      },
    },
    "Graphic Designer": {
      color: "#3b82f6",
      avatar: "🎨",
      description: "Creates visual elements and design language",
      voice: {
        voiceIndex: 1,
        pitch: 1.1,
        rate: 0.9,
      },
    },
    "SEO Specialist": {
      color: "#fbbf24",
      avatar: "🔍",
      description: "Optimizes content for search engines",
      voice: {
        voiceIndex: 2,
        pitch: 0.9,
        rate: 1.1,
      },
    },
    "Marketing Strategist": {
      color: "#9333ea",
      avatar: "📈",
      description: "Plans and executes marketing campaigns",
      voice: {
        voiceIndex: 3,
        pitch: 1.2,
        rate: 1,
      },
    },
    "Web Developer": {
      color: "#ef4444",
      avatar: "💻",
      description: "Builds and maintains websites",
      voice: {
        voiceIndex: 4,
        pitch: 0.8,
        rate: 1.05,
      },
    },
    "Social Media Manager": {
      color: "#f97316",
      avatar: "📱",
      description: "Manages social media platforms and engagement",
      voice: {
        voiceIndex: 5,
        pitch: 1.1,
        rate: 1.1,
      },
    },
    "UX Designer": {
      color: "#6366f1",
      avatar: "🖌️",
      description: "Designs user experiences and interfaces",
      voice: {
        voiceIndex: 6,
        pitch: 1,
        rate: 0.95,
      },
    },
    "Data Analyst": {
      color: "#4ade80",
      avatar: "📊",
      description: "Analyzes data to inform business decisions",
      voice: {
        voiceIndex: 7,
        pitch: 0.9,
        rate: 1,
      },
    },
  };

  // Load available voices
  useEffect(() => {
    // Assign voices to roles once voices are loaded
    const assignVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      if (availableVoices.length > 0) {
        console.log("Voices loaded:", availableVoices.length);
      }
    };

    // Firefox loads voices asynchronously
    if (typeof speechSynthesis !== "undefined") {
      speechSynthesis.onvoiceschanged = assignVoices;

      // Chrome might have voices already loaded
      assignVoices();

      // Cleanup
      return () => {
        speechSynthesis.onvoiceschanged = null;
        if (utteranceRef.current) {
          speechSynthesis.cancel();
        }
      };
    }
  }, []);

  // Function to remove formatting for speech
  const stripFormatting = (text) => {
    // Remove markdown formatting
    return text
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\*(.*?)\*/g, "$1")
      .replace(/^\s*\*\s+(.*?)$/gm, "$1");
  };

  // Function to speak text with highlighting
  const speakText = (text, role, messageIndex) => {
    setCurrentSpeakingIndex(messageIndex);
    setHighlightedWords([]);

    const cleanText = stripFormatting(text);
    const words = cleanText.split(/\s+/);

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utteranceRef.current = utterance;

    // Get available voices
    const voices = window.speechSynthesis.getVoices();

    // Assign voice based on role
    if (voices.length > 0) {
      const voiceInfo = roleInfo[role].voice;
      const voiceIndex = voiceInfo.voiceIndex % voices.length;
      utterance.voice = voices[voiceIndex];
      utterance.pitch = voiceInfo.pitch;
      utterance.rate = voiceInfo.rate;
    }

    // Add emotion through pitch and rate variations
    if (text.includes("!")) {
      utterance.pitch += 0.2; // Excited
      utterance.rate += 0.1;
    } else if (text.includes("?")) {
      utterance.pitch += 0.1; // Questioning
    } else if (text.includes("...")) {
      utterance.rate -= 0.1; // Thoughtful
    }

    // Word boundary event for highlighting
    utterance.onboundary = (event) => {
      if (event.name === "word") {
        const wordPosition = event.charIndex;
        const wordEnd = wordPosition + event.charLength;

        // Find which word this corresponds to
        let wordCount = 0;
        let charCount = 0;

        for (let i = 0; i < words.length; i++) {
          charCount += words[i].length + 1; // +1 for space
          if (wordPosition < charCount) {
            wordCount = i + 1;
            break;
          }
        }

        setHighlightedWords((prev) => [...prev.slice(-5), wordCount]);
      }
    };

    // When speech ends
    utterance.onend = () => {
      if (messageIndex < data.length - 1) {
        setTimeout(() => {
          speakText(
            data[messageIndex + 1].message,
            data[messageIndex + 1].agent,
            messageIndex + 1
          );
        }, 800); // Pause between speakers
      } else {
        setIsSpeaking(false);
        setCurrentSpeakingIndex(-1);
        setHighlightedWords([]);
        utteranceRef.current = null;
      }
    };

    window.speechSynthesis.speak(utterance);
  };

  // Start or stop the conversation
  const toggleConversation = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setCurrentSpeakingIndex(-1);
      setHighlightedWords([]);
      utteranceRef.current = null;
    } else {
      setIsSpeaking(true);
      setActiveTab("conversation");
      if (data.length > 0) {
        speakText(data[0].message, data[0].agent, 0);
      }
    }
  };

  // Function to render formatted messages with highlighting
  const renderFormattedText = (text, isCurrentlySpeaking, messageIndex) => {
    if (!isCurrentlySpeaking) {
      // Parse bold text
      let formattedText = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      // Parse italic text
      formattedText = formattedText.replace(/\*(.*?)\*/g, "<em>$1</em>");
      // Parse bullet points
      formattedText = formattedText.replace(/^\s*\*\s+(.*?)$/gm, "<li>$1</li>");
      formattedText = formattedText.replace(
        /<li>(.*?)<\/li>/g,
        '<ul style="margin-left: 20px; margin-top: 8px; margin-bottom: 8px;">$&</ul>'
      );
      // Handle line breaks
      formattedText = formattedText.replace(/\n\n/g, "<br/><br/>");
      return <div dangerouslySetInnerHTML={{ __html: formattedText }} />;
    } else {
      // For the currently speaking message, highlight words as they're spoken
      const cleanText = stripFormatting(text);
      const words = cleanText.split(/\s+/);

      return (
        <div>
          {words.map((word, i) => (
            <span
              key={i}
              style={{
                backgroundColor: highlightedWords.includes(i + 1)
                  ? "#ffeb3b"
                  : "transparent",
                padding: "0 2px",
                transition: "background-color 0.2s ease",
                display: "inline-block",
              }}
            >
              {word}{" "}
            </span>
          ))}
        </div>
      );
    }
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
                      opacity:
                        currentSpeakingIndex >= 0 &&
                        data[currentSpeakingIndex]?.agent === role
                          ? 1
                          : 0.7,
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
              <button
                type="button"
                onClick={toggleConversation}
                style={{
                  backgroundColor: isSpeaking ? "#f44336" : "#ff9800",
                  color: "#fff",
                  border: "none",
                  padding: "8px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "18px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                {isSpeaking ? (
                  <>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <rect x="6" y="4" width="4" height="16" />
                      <rect x="14" y="4" width="4" height="16" />
                    </svg>
                    Stop
                  </>
                ) : (
                  <>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <polygon points="5,3 19,12 5,21" />
                    </svg>
                    Start Conversation
                  </>
                )}
              </button>
              {isSpeaking && (
                <button
                  style={{
                    backgroundColor: "green",
                    color: "white",
                    border: "none",
                    padding: "8px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    marginRight: "8px",
                  }}
                  onClick={() => {
                    // Cancel current speech
                    window.speechSynthesis.cancel();

                    // Reset highlighting
                    setHighlightedWords([]);

                    // Move to next message if available
                    if (currentSpeakingIndex < data.length - 1) {
                      // Slight delay to ensure clean transition
                      setTimeout(() => {
                        speakText(
                          data[currentSpeakingIndex + 1].message,
                          data[currentSpeakingIndex + 1].agent,
                          currentSpeakingIndex + 1
                        );
                      }, 100);
                    }
                  }}
                >
                  Next
                </button>
              )}
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
                  <div
                    key={index}
                    style={{
                      ...styles.messageItem,
                      backgroundColor:
                        currentSpeakingIndex === index
                          ? `${roleInfo[message.agent]?.color}10`
                          : "transparent",
                      borderLeft:
                        currentSpeakingIndex === index
                          ? `4px solid ${roleInfo[message.agent]?.color}`
                          : "none",
                      paddingLeft:
                        currentSpeakingIndex === index ? "12px" : "16px",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <div
                      style={{
                        ...styles.messageAvatar,
                        backgroundColor: roleInfo[message.agent]?.color,
                        transform:
                          currentSpeakingIndex === index
                            ? "scale(1.1)"
                            : "scale(1)",
                        transition: "transform 0.3s ease",
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
                        {renderFormattedText(
                          message.message,
                          currentSpeakingIndex === index,
                          index
                        )}
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
              <h3 style={styles.keyPointsTitle}>Key Points:</h3>
              <ul style={styles.keyPointsList}>
                {summary}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationUI;
