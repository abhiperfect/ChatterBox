import React, { useEffect, useRef, useState } from "react";
import MessageComponent from "../common/MessageComponent.jsx";
import { useMessageContext } from "../../context/UserContext.js";
import { useUserContext } from "../../context/UserContext.js";
import { useSocket } from "../../socket.jsx";
import axios from "axios";
import { server } from "../../constants/config.jsx";

export default function MessageList() {
  const chatContainerRef = useRef(null);
  const { messages, setMessages } = useMessageContext();
  const { userDetails, setMembers } = useUserContext();
  const socket = useSocket();
  const [chat, setChat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { chatId, setChatId } = useUserContext();

  const getChatDetails = async (chatId, populate = false) => {
    try {
      const response = await axios.get(`${server}/api/v1/chat/${chatId}`, {
        params: { populate: populate.toString() },
        withCredentials: "true",
      });

      const mem = response?.data?.chat?.members;
      setMembers(mem);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response ? error?.response?.data?.message : error?.message
      );
    }
  };
  useEffect(() => {
    const fetchChatDetails = async () => {
      try {
        const data = await getChatDetails(chatId, true); // Change to false if you don't want to populate members
        setChat(data.chat);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChatDetails();
  }, [chatId]);

  useEffect(() => {
    // Scroll to the bottom of the chat container when messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
    // Adjust the delay time as needed
  }, []);

  return (
    <div className="chat-container" ref={chatContainerRef}>
      {messages?.map((i) => (
        <MessageComponent key={i?._id} message={i} user={userDetails} />
      ))}
    </div>
  );
}
