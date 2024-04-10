import React, { useState, useEffect, useRef } from "react";
import SendIcon from "@mui/icons-material/Send";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import AddIcon from "@mui/icons-material/Add";
import MyEmojiPicker from "./MyEmojipicker.jsx";

export default function MessageInput({ onSendMessage }) {
  const [inputValue, setInputValue] = useState("");
  const [sendButtonActive, setSendButtonActive] = useState(false);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [chosenEmojis, setChosenEmojis] = useState([]);
  const [inputFocus, setInputFocus] = useState(false);

  const emojiPickerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target) &&
        !inputRef.current.contains(event.target)
      ) {
        setIsEmojiPickerOpen(false);
      }
    }

    function handleBackspace(event) {
      if (event.key === "Backspace" && inputValue === "") {
        const newEmojis = [...chosenEmojis];
        newEmojis.pop(); // Remove the last emoji
        setChosenEmojis(newEmojis);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleBackspace);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleBackspace);
    };
  }, [chosenEmojis, inputValue]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setSendButtonActive(event.target.value.trim() !== "");
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== "") {
      const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const newMessage = {
        id: null,
        sender_id: "user1",
        message_text: inputValue,
        sent_at: currentTime,
      };
      onSendMessage(newMessage);
      setInputValue("");
      setSendButtonActive(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
    if (event.key === "Backspace") {
      const newEmojis = [...chosenEmojis];
      newEmojis.pop(); // Remove the last emoji
      setChosenEmojis(newEmojis);
    }
  };

  const toggleEmojiPicker = () => {
    setIsEmojiPickerOpen(!isEmojiPickerOpen);
  };

  const handleEmojiClick = (emoji) => {
    setChosenEmojis([...chosenEmojis, emoji]);
    setInputFocus(true);
  };

  
  return (
    <div className="chatbox-input">
      <AddIcon />
      <div style={{ position: "relative" }}>
        <InsertEmoticonIcon onClick={toggleEmojiPicker} />
        {isEmojiPickerOpen && (
          <div
            ref={emojiPickerRef}
            style={{ position: "absolute", zIndex: 999, top: "-466px" }}
          >
            <MyEmojiPicker selectedEmoji={handleEmojiClick} />
          </div>
        )}
      </div>
      <input
        type="text"
        placeholder="Type your message..."
        value={inputValue + chosenEmojis.join("")}
        onChange={handleInputChange}
        onKeyUp={handleKeyPress}
        ref={inputRef}
        onFocus={() => setInputFocus(true)}
        onBlur={() => setInputFocus(false)}
      />{" "}
      {sendButtonActive ? (
        <SendIcon onClick={handleSendMessage} />
      ) : (
        <KeyboardVoiceIcon />
      )}
    </div>
  );
}
