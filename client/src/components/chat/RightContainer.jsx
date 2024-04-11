import React, { useState } from "react";
import SimpleContainer from "../common/SimpleContainer";
import HeaderOfSender from "../common/HeaderOfSender.jsx";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

export default function RightContainer({ isOpen, handleSetToggleIsOpen, handleMobileView, messages, handleSendMessage }) {
  const handleToggle = () => {
    handleSetToggleIsOpen();
  };

  return (
    <div style={{ display: isOpen ? "block" : "none" }}>
      <HeaderOfSender borderTopRightRadius="20px" handleSetToggleIsOpen={handleToggle} handleMobileView={handleMobileView} />
      <SimpleContainer backgroundColor="#DFE5EA" height="73vh">
        <MessageList messages={messages} />
        <MessageInput onSendMessage={handleSendMessage} />
      </SimpleContainer>
    </div>
  );
}
