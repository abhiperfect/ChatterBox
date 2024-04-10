import React, { useEffect, useRef } from "react";

export default function MessageList({ messages }) {
  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the chat container when messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (chatContainerRef.current) {
      console.log("MessageList UseEffect:");
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
    // Adjust the delay time as needed
  }, []);

  return (
    <div className="chat-container" ref={chatContainerRef}>
      {messages.map((message, index) => (
        <div
          id={index}
          key={index}
          className={`message-box ${
            message.sender_id === "user1" ? "my-message" : "friend-message"
          }`}
        >
          <p>
            {message.message_text}
            <br />
            <span>{message.sent_at}</span>
          </p>
        </div>
      ))}
    </div>
  );
}
