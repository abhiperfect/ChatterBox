import React, { useEffect, useRef } from "react";
import MessageComponent from "../common/MessageComponent.jsx";
import { useMessageContext } from "../../context/UserContext.js";
import { useUserContext } from "../../context/UserContext.js";

export default function MessageList() {
  const chatContainerRef = useRef(null);
  const { messages} = useMessageContext();
  const {userDetails} = useUserContext();


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
    <div
      className="chat-container"
      ref={chatContainerRef}
    >
             {messages.map((i) => (
          <MessageComponent key={i._id} message={i} user={userDetails} />
        ))}

    </div>
  );
}
