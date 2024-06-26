import React, { useEffect, useRef, useState } from "react";
import MessageComponent from "../common/MessageComponent.jsx";
import { useMessageContext } from "../../context/UserContext.js";
import { useUserContext } from "../../context/UserContext.js";
import { useSocket } from "../../socket.jsx";
import axios from "axios";
import { server } from "../../constants/config.jsx";
import { useSenderContext } from "../../context/UserContext.js";

export default function MessageList() {
  const chatContainerRef = useRef(null);
  const { messages, setMessages, newMessages, setNewMessages } =
    useMessageContext();
  const { userDetails, setMembers } = useUserContext();
  const socket = useSocket();
  const [chat, setChat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { chatId, setChatId } = useUserContext();
  const { friendDetails, setFriendDetails } = useSenderContext();

  useEffect(() => {
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
  }, [chatId, setMembers]);

  useEffect(() => {
    // Scroll to the bottom of the chat container when messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages, newMessages]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
    // Adjust the delay time as needed
  }, []);

  const sortedMessages = [...(messages || []), ...(newMessages || [])].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );

  return (
    <div className="chat-container" ref={chatContainerRef}>
      {sortedMessages.map((i, index) => (
        <MessageComponent
          key={index}
          message={i}
          friendDetails={friendDetails}
          userDetails={userDetails}
        />
      ))}
    </div>
  );
}
