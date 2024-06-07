import React, { useState } from "react";
import SimpleContainer from "../common/SimpleContainer";
import HeaderOfSender from "../common/HeaderOfSender.jsx";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { backgroundColor } from "../../constants/color.jsx";
export default function RightContainer({ isOpen, handleSetToggleIsOpen, handleMobileView, handleSendMessage}) {
  const [isRightContainerOpen, setIsRightContainerOpen] = useState(false);
  const handleToggle = () => {
    setIsRightContainerOpen(true);
  };

  return (
    <div style={{ display: true ? "block" : "none" }}>
      <HeaderOfSender borderTopRightRadius="20px" handleSetToggleIsOpen={handleToggle} handleMobileView={handleMobileView} 
      />
      <SimpleContainer backgroundColor={backgroundColor} height="73vh">
        <MessageList />
        <MessageInput onSendMessage={handleSendMessage} />
      </SimpleContainer>
    </div>
  );
}
