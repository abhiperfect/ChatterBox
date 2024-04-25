import React, { useEffect, useRef } from "react";
import { useUserContext } from "../../context/UserContext.js";

export default function MessageList() {
  const chatContainerRef = useRef(null);
  const { messages, selectedUserId, userData} = useUserContext();
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
            message.senderid !== selectedUserId ? "my-message" : "friend-message"
          }`}
        >
          <p>
            {message.content}
            <br />
            <span>{message.timestamp}</span>
          </p>
        </div>
      ))}
    </div>
  );
}
