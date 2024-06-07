import React, { useEffect, useRef } from "react";
import { sampleMessage } from "../../constants/sampleData.js";
import { motion } from "framer-motion";
import moment from "moment";
import RenderAttachment from "../common/RenderAttachment.jsx";
import { fileFormat } from "../../lib/features.jsx";
import { Box, Stack } from "@mui/material";
import MessageComponent from "../common/MessageComponent.jsx";

export default function MessageList() {
  const chatContainerRef = useRef(null);
  const selectedUserId = 2;

  useEffect(() => {
    // Scroll to the bottom of the chat container when messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [sampleMessage]);

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
             {sampleMessage.map((i) => (
          <MessageComponent key={i._id} message={i} user={"1"} />
        ))}

    </div>
  );
}
