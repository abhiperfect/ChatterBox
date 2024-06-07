import React, { useState, useEffect, useRef } from "react";
import SendIcon from "@mui/icons-material/Send";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import AddIcon from "@mui/icons-material/Add";
import MyEmojiPicker from "./MyEmojipicker.jsx";
const sendSoundPath = "/sound/send.mp3";
const receiveSoundPath = "/sound/receive.mp3";

export default function MessageInput() {
  const [inputValue, setInputValue] = useState("");
  const [sendButtonActive, setSendButtonActive] = useState(false);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [chosenEmojis, setChosenEmojis] = useState([]);
  const [inputFocus, setInputFocus] = useState(false);

  const emojiPickerRef = useRef(null);
  const inputRef = useRef(null);

  const handleInputChange = (event) => {

  };

  const handleSendMessage = () => {
  };

  const handleKeyPress = (event) => {
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
