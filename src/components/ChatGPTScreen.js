import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

import './ChatGPTScreenSearch.css';

const ChatGPTScreenSearch = () => {
  const [chatMessages, setChatMessages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPopup, setShowPopup] = useState(false);


  const sendMessage = async (message) => {
    setChatMessages([...chatMessages, { role: 'user', content: message }]);
  
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer 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',
  },
  body: JSON.stringify({
    model: 'davinci', // Add the model parameter with the desired model value
    prompt: [
      { role: 'system', content: 'You are a user' },
      ...chatMessages.map((msg) => ({ role: 'user', content: msg.content })),
      { role: 'user', content: message },
    ],
    max_tokens: 100,
  }),
});

  
      const data = await response.json();
      console.log('Response data:', data);
  
      if (data.choices && data.choices.length > 0) {
        const aiResponse = data.choices[0].text.trim();
        setChatMessages([...chatMessages, { role: 'ai', content: aiResponse }]);
        setShowPopup(true); // Show the popup
      }
    } catch (error) {
      console.error('Error sending message to ChatGPT:', error);
    }
  };
  
  
  
  

  return (
    <div className="chat-container">
      <h2>Chat with ChatGPT</h2>

      <div className="message-container">
        {chatMessages.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            {message.content}
          </div>
        ))}
      </div>

      <div className="input-container">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={() => sendMessage(searchQuery)}>Send</button>
      </div>

      <Modal show={showPopup} onHide={() => setShowPopup(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>ChatGPT Response</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {chatMessages.map((message, index) => (
            <div key={index} className={`popup-message ${message.role}`}>
              {message.content}
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPopup(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ChatGPTScreenSearch;