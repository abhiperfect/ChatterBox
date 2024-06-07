import React, { useEffect, useRef, useState } from "react";

import { sampleMessage } from "../../constants/sampleData.js";


export default function MessageList() {
  const chatContainerRef = useRef(null);
  const selectedUserId = 2;
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender_id: "user1",
      message_text: "Hey there! How are you?",
      sent_at: "10:30 AM",
    },
    {
      id: 2,
      sender_id: "friend1",
      message_text: "I'm doing great, thanks for asking!",
      sent_at: "10:32 AM",
    },
    {
      id: 3,
      sender_id: "user1",
      message_text: "That's good to hear!",
      sent_at: "10:35 AM",
    },
    {
      id: 4,
      sender_id: "friend1",
      message_text: "How about you? How's everything going on your end?",
      sent_at: "10:40 AM",
    },
    {
      id: 5,
      sender_id: "user1",
      message_text: "Everything's going well. Just busy with work!",
      sent_at: "10:45 AM",
    },
    {
      id: 6,
      sender_id: "friend1",
      message_text: "I understand. Work can be hectic sometimes.",
      sent_at: "10:50 AM",
    },
    {
      id: 7,
      sender_id: "user1",
      message_text: "Yeah, definitely. How's your day going?",
      sent_at: "10:55 AM",
    },
    {
      id: 8,
      sender_id: "friend1",
      message_text: "It's going pretty well. Just relaxing at home.",
      sent_at: "11:00 AM",
    },
    {
      id: 9,
      sender_id: "user1",
      message_text: "Sounds nice! Enjoy your day.",
      sent_at: "11:05 AM",
    },
    {
      id: 10,
      sender_id: "friend1",
      message_text: "Thanks! You too.",
      sent_at: "11:10 AM",
    },
  ]);
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
            message.sender_id !== selectedUserId ? "my-message" : "friend-message"
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
