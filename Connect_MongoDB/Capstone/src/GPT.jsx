import React, { useState } from 'react';

const ChatGPTComponent = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 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', // Replace with your API key
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: inputText },
          ],
        }),
      });

      const result = await response.json();
      setOutputText(result.choices[0].message.content);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Chat with ChatGPT</h1>
      <div>
        <label htmlFor="input">User Input:</label>
        <input
          type="text"
          id="input"
          value={inputText}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleSubmit}>Submit</button>
      <div>
        <h2>ChatGPT's Response:</h2>
        <p>{outputText}</p>
      </div>
    </div>
  );
};

export default ChatGPTComponent;
