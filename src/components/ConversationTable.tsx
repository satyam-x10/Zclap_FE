import React, { useState, useEffect } from 'react';

// Define CSS styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    fontFamily: 'Arial, sans-serif',
    minHeight: '100vh',
    boxSizing: 'border-box'
  },
  card: {
    width: '100%',
    maxWidth: '1000px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    padding: '24px',
    marginBottom: '24px'
  },
  header: {
    textAlign: 'center',
    marginBottom: '24px'
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#2e3d49',
    marginBottom: '8px'
  },
  subtitle: {
    fontSize: '16px',
    color: '#6c757d',
    marginBottom: '24px'
  },
  conversationArea: {
    position: 'relative',
    width: '100%',
    height: '450px',
    marginBottom: '32px'
  },
  table: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '250px',
    height: '250px',
    backgroundColor: 'linear-gradient(to right, #e6f7ee, #e6f1ff)',
    borderRadius: '50%',
    border: '4px solid #e6ffe6',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tableInner: {
    width: '180px',
    height: '180px',
    backgroundColor: 'white',
    borderRadius: '50%',
    boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  tableIcon: {
    fontSize: '24px',
    marginBottom: '8px'
  },
  tableText: {
    fontWeight: 'bold',
    color: '#22996d',
    fontSize: '16px'
  },
  tableSubtext: {
    fontSize: '12px',
    color: '#6c757d'
  },
  characterBase: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    color: 'white',
    fontWeight: 'bold',
    zIndex: 10,
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    border: '4px solid white'
  },
  characterLabel: {
    position: 'absolute',
    bottom: '-30px',
    left: '50%',
    transform: 'translateX(-50%)',
    whiteSpace: 'nowrap',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#333'
  },
  characterIcon: {
    fontSize: '24px',
    marginBottom: '4px'
  },
  characterName: {
    fontSize: '12px'
  },
  characterLine: {
    position: 'absolute',
    top: '0',
    left: '50%',
    width: '2px',
    height: '60px',
    backgroundColor: '#ddd',
    transform: 'translateX(-50%) translateY(-100%)'
  },
  speechBubble: {
    position: 'absolute',
    top: '10px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100%', 
    maxWidth: '600px',
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    border: '1px solid #e6e6e6',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    zIndex: 20
  },
  speechTriangle: {
    position: 'absolute',
    bottom: '-10px',
    left: '50%',
    transform: 'translateX(-50%) rotate(45deg)',
    width: '20px',
    height: '20px',
    backgroundColor: 'white',
    borderRight: '1px solid #e6e6e6',
    borderBottom: '1px solid #e6e6e6'
  },
  speakerHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '16px'
  },
  speakerAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    marginRight: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px'
  },
  speakerInfo: {
    display: 'flex',
    flexDirection: 'column'
  },
  speakerName: {
    fontWeight: 'bold',
    fontSize: '18px'
  },
  speakerModel: {
    fontSize: '12px',
    color: '#6c757d'
  },
  messageCounter: {
    marginLeft: 'auto',
    padding: '4px 10px',
    borderRadius: '20px',
    backgroundColor: '#f0f0f0',
    fontSize: '12px',
    fontWeight: 'medium',
    color: '#333'
  },
  messageContent: {
    overflowY: 'auto',
    maxHeight: '200px',
    lineHeight: '1.6',
    color: '#333',
    padding: '0 5px'
  },
  typingCursor: {
    display: 'inline-block',
    width: '8px',
    height: '20px',
    backgroundColor: '#555',
    marginLeft: '4px',
    animation: 'blink 1s infinite'
  },
  completionNotice: {
    position: 'absolute',
    top: '10px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100%',
    maxWidth: '500px',
    padding: '20px',
    backgroundColor: '#e6f7ee',
    color: '#2e7d32',
    borderRadius: '8px',
    textAlign: 'center',
    border: '1px solid #c8e6c9',
    zIndex: 20
  },
  completionTitle: {
    fontSize: '20px',
    marginBottom: '8px',
    fontWeight: 'bold'
  },
  completionText: {
    marginBottom: '16px'
  },
  restartButton: {
    backgroundColor: '#2e7d32',
    color: 'white',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.2s'
  },
  controlsWrapper: {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
    marginBottom: '24px'
  },
  buttonBase: {
    padding: '10px 16px',
    borderRadius: '8px',
    border: 'none',
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    transition: 'background-color 0.2s'
  },
  buttonDisabled: {
    backgroundColor: '#e0e0e0',
    color: '#9e9e9e',
    cursor: 'not-allowed'
  },
  prevButton: {
    backgroundColor: '#e0f2f1',
    color: '#00796b'
  },
  nextButton: {
    backgroundColor: '#e0f2f1',
    color: '#00796b'
  },
  playButton: {
    backgroundColor: '#e8f5e9',
    color: '#388e3c'
  },
  pauseButton: {
    backgroundColor: '#fff8e1',
    color: '#ffa000'
  },
  progressBar: {
    width: '100%',
    height: '8px',
    backgroundColor: '#e0e0e0',
    borderRadius: '4px',
    marginBottom: '24px',
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3f51b5',
    borderRadius: '4px',
    transition: 'width 0.3s ease-in-out'
  },
  transcriptWrapper: {
    width: '100%',
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    border: '1px solid #e9ecef',
    padding: '24px'
  },
  transcriptHeader: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '16px',
    color: '#333'
  },
  transcriptIcon: {
    marginRight: '8px'
  },
  transcriptMessages: {
    maxHeight: '250px',
    overflowY: 'auto',
    paddingRight: '8px'
  },
  emptyTranscript: {
    textAlign: 'center',
    padding: '32px 0',
    color: '#6c757d'
  },
  messageItem: {
    marginBottom: '24px'
  },
  messageHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '8px'
  },
  messageAvatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    marginRight: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  messageName: {
    fontWeight: 'bold'
  },
  messageModel: {
    marginLeft: '8px',
    fontSize: '12px',
    padding: '2px 8px',
    backgroundColor: '#f0f0f0',
    borderRadius: '20px'
  },
  messageBody: {
    paddingLeft: '40px',
    color: '#333'
  },
  teamInfoWrapper: {
    width: '100%',
    maxWidth: '1000px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
    padding: '24px'
  },
  teamCard: {
    paddingLeft: '16px',
    borderLeftWidth: '4px',
    borderLeftStyle: 'solid'
  },
  teamHeader: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '8px'
  },
  teamIcon: {
    marginRight: '8px'
  },
  teamDescription: {
    fontSize: '14px',
    color: '#6c757d',
    lineHeight: '1.6'
  },
  '@keyframes blink': {
    '0%': { opacity: 1 },
    '50%': { opacity: 0 },
    '100%': { opacity: 1 }
  }
};

// Create global styles for keyframes
const createGlobalStyle = () => {
  if (typeof document !== 'undefined') {
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      @keyframes blink {
        0% { opacity: 1; }
        50% { opacity: 0; }
        100% { opacity: 1; }
      }
    `;
    document.head.appendChild(styleEl);
    return () => document.head.removeChild(styleEl);
  }
};

const ConversationTable = () => {
  useEffect(() => {
    const cleanup = createGlobalStyle();
    return cleanup;
  }, []);

  const [currentSpeaker, setCurrentSpeaker] = useState(null);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [conversations, setConversations] = useState([]);
  const [autoPlay, setAutoPlay] = useState(true);
  
  // Define our conversation data
  const data = [
    {
      "sno": 1,
      "agent": "ContentWriter",
      "message": "Team, we need to create a marketing campaign for the EcoSmart Home Hub product launch. Let's collaborate on ideas.",
      "model": "gemini"
    }
  ];

  // Get unique roles
  const uniqueRoles = [...new Set(data.map(item => item.agent))];
  
  // Assign colors to different roles
  const roleColors = {
    "ContentWriter": "#22c55e", // Vibrant green
    "GraphicDesigner": "#3b82f6", // Vibrant blue
  };

  // Role avatars and descriptions
  const roleInfo = {
    "ContentWriter": {
      avatar: "📝",
      description: "Develops compelling copy and messaging strategies"
    },
    "GraphicDesigner": {
      avatar: "🎨",
      description: "Creates visual elements and design language"
    }
  };

  // Function to calculate position around a table
  const getPositionForCharacter = (index, total) => {
    const angle = (index / total) * 2 * Math.PI;
    const radius = 160; // Distance from center
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    
    return {
      transform: `translate(${x}px, ${y}px)`,
      marginTop: '-45px',
      marginLeft: '-45px',
    };
  };

  // Function to animate typing text
  useEffect(() => {
    if (currentMessageIndex >= data.length || !autoPlay) return;
    
    const speakerIndex = uniqueRoles.indexOf(data[currentMessageIndex].agent);
    setCurrentSpeaker(speakerIndex);
    setIsTyping(true);
    setDisplayedText('');
    
    const message = data[currentMessageIndex].message;
    let charIndex = 0;
    
    const typingInterval = setInterval(() => {
      if (charIndex < message.length) {
        setDisplayedText(prev => prev + message.charAt(charIndex));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
        
        // Add this message to conversation history
        setConversations(prev => [
          ...prev, 
          {
            agent: data[currentMessageIndex].agent,
            message: message,
            model: data[currentMessageIndex].model
          }
        ]);
        
        // Move to next message after a delay
        setTimeout(() => {
          setCurrentMessageIndex(prev => prev + 1);
        }, 2000);
      }
    }, 15);
    
    return () => clearInterval(typingInterval);
  }, [currentMessageIndex, autoPlay]);

  // Process message to render markdown-like formatting
  const renderFormattedText = (text) => {
    // Parse bold text
    let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Parse italic text
    formattedText = formattedText.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Parse bullet points (simple)
    formattedText = formattedText.replace(/^\s*\*\s+(.*?)$/gm, '<li>$1</li>');
    formattedText = formattedText.replace(/<li>(.*?)<\/li>/g, '<ul style="list-style-type: disc; margin-left: 24px; margin-top: 8px; margin-bottom: 8px;">$&</ul>');
    
    // Handle line breaks
    formattedText = formattedText.replace(/\n\n/g, '<br/><br/>');
    
    return <div dangerouslySetInnerHTML={{ __html: formattedText }} />;
  };

  // Manual navigation functions
  const goToPrevious = () => {
    if (currentMessageIndex > 0) {
      setAutoPlay(false);
      setCurrentMessageIndex(prev => prev - 1);
      const prevMessage = data[currentMessageIndex - 1];
      setDisplayedText(prevMessage.message);
      setCurrentSpeaker(uniqueRoles.indexOf(prevMessage.agent));
    }
  };

  const goToNext = () => {
    if (currentMessageIndex < data.length) {
      setAutoPlay(false);
      if (currentMessageIndex === conversations.length) {
        // Add current message to conversation if it's not there yet
        setConversations(prev => [
          ...prev, 
          {
            agent: data[currentMessageIndex].agent,
            message: data[currentMessageIndex].message,
            model: data[currentMessageIndex].model
          }
        ]);
      }
      setCurrentMessageIndex(prev => prev + 1);
      if (currentMessageIndex + 1 < data.length) {
        setDisplayedText('');
        setTimeout(() => {
          setDisplayedText(data[currentMessageIndex + 1].message);
          setCurrentSpeaker(uniqueRoles.indexOf(data[currentMessageIndex + 1].agent));
        }, 300);
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        
        {/* Main conversation area */}
        <div style={styles.conversationArea}>
          
          {/* Characters around the table */}
          {uniqueRoles.map((role, index) => {
            const positionStyle = getPositionForCharacter(index, uniqueRoles.length);
            const isCurrentSpeaker = currentSpeaker === index;
            const characterStyle = {
              ...styles.characterBase,
              ...positionStyle,
              backgroundColor: roleColors[role],
              transform: `${positionStyle.transform} scale(${isCurrentSpeaker ? 1.15 : 1})`,
              boxShadow: isCurrentSpeaker 
                ? `0 0 30px ${roleColors[role]}` 
                : styles.characterBase.boxShadow
            };
            
            return (
              <div key={index} style={characterStyle}>
                <div style={styles.characterIcon}>{roleInfo[role]?.avatar}</div>
                <div style={styles.characterName}>{role}</div>
                <div style={styles.characterLabel}>{role}</div>
                
                {/* Connection line to speech bubble when speaking */}
                {isCurrentSpeaker && currentMessageIndex < data.length && (
                  <div style={styles.characterLine}></div>
                )}
              </div>
            );
          })}
          
          {/* Speech bubble */}
          {currentMessageIndex < data.length && (
            <div style={styles.speechBubble}>
              <div style={styles.speechTriangle}></div>
              
              <div style={styles.speakerHeader}>
                <div style={{
                  ...styles.speakerAvatar,
                  backgroundColor: roleColors[data[currentMessageIndex].agent]
                }}>
                  {roleInfo[data[currentMessageIndex].agent]?.avatar}
                </div>
                <div style={styles.speakerInfo}>
                  <div style={styles.speakerName}>{data[currentMessageIndex].agent}</div>
                  <div style={styles.speakerModel}>
                    Powered by {data[currentMessageIndex].model}
                  </div>
                </div>
                <div style={styles.messageCounter}>
                  Message {currentMessageIndex + 1} of {data.length}
                </div>
              </div>
              
              <div style={styles.messageContent}>
                {renderFormattedText(displayedText)}
                {isTyping && <span style={styles.typingCursor}></span>}
              </div>
            </div>
          )}
          
          {/* Completed indicator */}
          {currentMessageIndex >= data.length && (
            <div style={styles.completionNotice}>
              
              <button 
                onClick={() => {
                  setCurrentMessageIndex(0);
                  setConversations([]);
                  setAutoPlay(true);
                }}
                style={styles.restartButton}
              >
                Restart Conversation
              </button>
            </div>
          )}
        </div>
        
        {/* Controls */}
        <div style={styles.controlsWrapper}>
          <button 
            onClick={goToPrevious}
            disabled={currentMessageIndex === 0}
            style={{
              ...styles.buttonBase,
              ...(currentMessageIndex === 0 ? styles.buttonDisabled : styles.prevButton)
            }}
          >
            ← Previous
          </button>
          
          <button 
            onClick={() => setAutoPlay(!autoPlay)}
            style={{
              ...styles.buttonBase,
              ...(autoPlay ? styles.pauseButton : styles.playButton)
            }}
          >
            {autoPlay ? 'Pause Auto-Play' : 'Resume Auto-Play'}
          </button>
          
          <button 
            onClick={goToNext}
            disabled={currentMessageIndex >= data.length}
            style={{
              ...styles.buttonBase,
              ...(currentMessageIndex >= data.length ? styles.buttonDisabled : styles.nextButton)
            }}
          >
            Next →
          </button>
        </div>
        
      
        {/* Conversation transcript */}
        <div style={styles.transcriptWrapper}>
          <h3 style={styles.transcriptHeader}>
            <svg style={styles.transcriptIcon} width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            Conversation Transcript
          </h3>
          
          <div style={styles.transcriptMessages}>
            {conversations.length === 0 ? (
              <div style={styles.emptyTranscript}>
                Conversation will appear here as it progresses
              </div>
            ) : (
              conversations.map((item, index) => (
                <div key={index} style={styles.messageItem}>
                  <div style={styles.messageHeader}>
                    <div style={{
                      ...styles.messageAvatar,
                      backgroundColor: roleColors[item.agent]
                    }}>
                      {roleInfo[item.agent]?.avatar}
                    </div>
                    <div style={styles.messageName}>{item.agent}</div>
                    <div style={styles.messageModel}>
                      {item.model}
                    </div>
                  </div>
                  <div style={styles.messageBody}>
                    {renderFormattedText(item.message)}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default ConversationTable;