import React, { useState, useEffect, useRef } from "react";
import SendIcon from "@mui/icons-material/Send";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { IconButton } from "@mui/material";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import useTheme from "@mui/system/useTheme";
import {
  useMessageContext,
  useUserContext,
  useSenderContext,
} from "../../context/UserContext"; // Updated import

const sendSoundPath = "/sound/send.mp3";
const receiveSoundPath = "/sound/receive.mp3";

export default function MessageInput() {
  const [inputValue, setInputValue] = useState("");
  const [sendButtonActive, setSendButtonActive] = useState(false);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [chosenEmojis, setChosenEmojis] = useState([]);
  const [inputFocus, setInputFocus] = useState(false);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);

  const { setMessages } = useMessageContext();
  const { userDetails } = useUserContext();
  const { selectUserDetails } = useSenderContext();

  const theme = useTheme();
  const emojiPickerRef = useRef(null);
  const inputRef = useRef(null);
  const chatBoxRef = useRef(null);

  useEffect(() => {
    // Activate send button if there's input or emojis
    setSendButtonActive(
      inputValue.trim().length > 0 || chosenEmojis.length > 0
    );
  }, [inputValue, chosenEmojis]);

  const isValidMessage = (message) => {
    return message.trim() !== "";
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSendMessage = (event) => {
    if (event && event.key && event.key !== "Enter" && event.type !== "click")
      return;

    if (isValidMessage(inputValue) || chosenEmojis.length > 0) {
      const messageContent = inputValue + chosenEmojis.join("");
      console.log("Sending message:", messageContent);
      setInputValue("");
      setChosenEmojis([]);

      // Add the new message to the messages state
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          attachments: [],
          content: messageContent,
          _id: selectUserDetails.userid,
          sender: {
            _id: userDetails?._id,
            name: userDetails?.username,
          },
          chat: "chatId",
          createdAt: new Date().toISOString(),
        },
      ]);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage(event);
    }
  };

  const toggleEmojiPicker = () => {
    setIsEmojiPickerOpen(!isEmojiPickerOpen);
  };

  const handleEmojiClick = (emoji) => {
    if (emoji) {
      setInputValue(inputValue + emoji.native);
    }
  };

  const handleFileOpen = (e) => {};
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setFileMenuAnchor(e.currentTarget);
    // Handle the selected file
    console.log("Selected file:", file);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatBoxRef.current && !chatBoxRef.current.contains(event.target)) {
        setIsEmojiPickerOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="chatbox-input" ref={chatBoxRef}>
      <IconButton
        sx={{
          position: "absolute",
          left: "1.0rem",
        }}
        onClick={() => inputRef.current.click()} // Trigger input file selection
      >
        <input
          type="file"
          ref={inputRef}
          style={{ display: "none" }} // Hide the input element
          onChange={handleFileInputChange}
        />
        <AttachFileIcon />
      </IconButton>
      <IconButton
        sx={{
          position: "absolute",
          left: "3.5rem",
        }}
        onClick={toggleEmojiPicker}
      >
        <InsertEmoticonIcon />
      </IconButton>
      <div style={{ position: "absolute", zIndex: "999", bottom: "63px" }}>
        {isEmojiPickerOpen && (
          <Picker
            theme={theme.palette.mode}
            data={data}
            onEmojiSelect={handleEmojiClick}
          />
        )}
      </div>
      <input
        type="text"
        placeholder="Type your message..."
        value={inputValue + chosenEmojis.join("")}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress} // Use onKeyPress instead of onKeyUp
        onFocus={() => setInputFocus(true)}
        onBlur={() => setInputFocus(false)}
        style={{ width: "100%" }} // Adjust padding to avoid overlap with icons
      />
      {sendButtonActive ? (
        <IconButton
          sx={{ position: "absolute", right: "0.8rem" }}
          onClick={handleSendMessage} // Pass the event to handleSendMessage
        >
          <SendIcon />
        </IconButton>
      ) : (
        <IconButton sx={{ position: "absolute", right: "0.8rem" }}>
          <KeyboardVoiceIcon />
        </IconButton>
      )}
    </div>
  );
}
