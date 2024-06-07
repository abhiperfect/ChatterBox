import React, { useState } from "react";
import SimpleContainer from "../common/SimpleContainer";
import HeaderOfSender from "../common/HeaderOfSender.jsx";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { backgroundColor } from "../../constants/color.jsx";
import { useComponentContext } from "../../context/UserContext.js";

export default function RightContainer({ handleMobileView, handleSendMessage}) {
  const {isRightContainerOpen, setIsRightContainerOpen} = useComponentContext();
  const handleToggle = () => {
    setIsRightContainerOpen(!isRightContainerOpen);
  };

  return (
    <div style={{ display: isRightContainerOpen ? "block" : "none" }}>
      <HeaderOfSender borderTopRightRadius="20px" handleSetToggleIsOpen={handleToggle} handleMobileView={handleMobileView} 
      />
      <SimpleContainer backgroundColor={backgroundColor} height="73vh">
        <MessageList />
        <MessageInput onSendMessage={handleSendMessage} />
      </SimpleContainer>
    </div>
  );
}
