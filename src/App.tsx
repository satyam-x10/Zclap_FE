import React, { useState } from 'react';
import './App.css';

function App() {
  const [product, setProduct] = useState({
    "name": "EcoSmart Home Hub",
    "description": "A smart home control center that optimizes energy usage, integrates with all major smart home devices, and helps reduce environmental impact while saving money",
    "target_audience": "Environmentally conscious homeowners, tech enthusiasts, and energy-conscious consumers",
    "key_features": ["Energy optimization", "Cross-platform compatibility", "AI-powered suggestions", "Usage analytics dashboard"]
  });
  
  // Added names to the agents
  const [agents, setAgents] = useState([
    {
      "role": "You are a creative content writer specialized in crafting compelling marketing copy. Focus on storytelling and engaging language that resonates with target audiences.",
      "model": "gemini",
      "name": "ContentWriter"
    },
    {
      "role": "You are a graphic designer with an eye for visual appeal and brand consistency. You suggest visual elements, color schemes, and design approaches for marketing materials.",
      "model": "groq",
      "name": "GraphicDesigner"
    }
  ]);
  
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateContent = async () => {
    setLoading(true);
    try {
      console.log('Sending data to backend:', { product, agents });
      
      const response = await fetch('http://localhost:8000/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product: product,
          agents: agents
        }),
      });
        console.log('Response from backend:', response);
        
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setResponse(data);
    } catch (error) {
      console.error('Error sending data to backend:', error);
      setResponse({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>EcoSmart Marketing Generator</h1>
      
      <div>
        <h2>Product Details</h2>
        <pre>{JSON.stringify(product, null, 2)}</pre>
      </div>
      
      <div>
        <h2>AI Agents</h2>
        <pre>{JSON.stringify(agents, null, 2)}</pre>
      </div>
      
      <button 
        onClick={handleGenerateContent}
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate Marketing Content'}
      </button>
      
      {response && (
        <div>
          <h2>Generated Content</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;