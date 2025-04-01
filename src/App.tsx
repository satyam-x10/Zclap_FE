import React, { useState } from 'react';
import './App.css';

function App() {
  

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
    </div>
  );
}

export default App;