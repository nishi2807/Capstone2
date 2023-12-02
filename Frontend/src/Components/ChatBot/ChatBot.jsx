import React, { useState } from "react";
import "./ChatBot.css";

function ChatBot() {

  console.log(process.env.REACT_APP_API_KEY)

  const [inputValue, setInputValue] = useState("");
    const [chat, setChat] = useState(localStorage.getItem('chat') ? JSON.parse(localStorage.getItem('chat')) : []);

  const handleBOTcall = async (input) => {
    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              `Bearer ${process.env.REACT_APP_API_KEY}`, // Replace with your API key
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              { role: "system", content: "You are a helpful assistant." },
              { role: "user", content: input },
            ],
          }),
        }
      );

      const result = await response.json();
      console.log(result.choices[0].message.content)
      setChat((prevChat) => [
        ...prevChat,
        { data: result.choices[0].message.content, from: "bot" },
      ]);
      localStorage.setItem('chat', JSON.stringify(chat))
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setChat((prevChat) => [...prevChat, { data: inputValue, from: "user" }]);
    localStorage.setItem('chat', JSON.stringify(chat))
    setInputValue("");
    handleBOTcall(inputValue);
  };

  return (
    <div className="chat-page">
      <div className="chat-area">
        {chat.map((data, index) => (
          <div
            className="msg-container"
            key={index}
            style={{ justifyContent: data.from === "user" ? "end" : "start" }}
          >
            <div
              className="msg"
              style={{
                backgroundColor: data.from === "user" ? "#9693FF" : "#D8CEFF",
                borderRadius:
                  data.from === "user"
                    ? "15px 0px 15px 15px"
                    : "0px 15px 15px 15px",
              }}
            >
              {data.data}
            </div>
          </div>
        ))}
      </div>
      <div className="bottom-div1">
        <form onSubmit={handleSubmit} className="bottom-div">
          <input
            type="text"
            className="input-div"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Start chat..."
            style={{ marginRight: "10px" }}
          />
          <button type="submit" className="submit-btn">
            <div className="icon-div"></div>
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatBot;
