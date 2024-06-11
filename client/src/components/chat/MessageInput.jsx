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
import { useSocket } from "../../socket";
import {
  ALERT,
  CHAT_JOINED,
  CHAT_LEAVED,
  NEW_MESSAGE,
  START_TYPING,
  STOP_TYPING,
} from "../../constants/events.js";
import { getMessages } from "../apis/api.js";



const sendSoundPath = "/sound/send.mp3";
const receiveSoundPath = "/sound/receive.mp3";

export default function MessageInput() {
  const [inputValue, setInputValue] = useState("");
  const [sendButtonActive, setSendButtonActive] = useState(false);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [chosenEmojis, setChosenEmojis] = useState([]);
  const [inputFocus, setInputFocus] = useState(false);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);

  const { messages,setMessages } = useMessageContext();
  const { userDetails, chatId, setChatId, members, setMembers } =
    useUserContext();
  const { selectUserDetails } = useSenderContext();

  const theme = useTheme();
  const emojiPickerRef = useRef(null);
  const inputRef = useRef(null);
  const chatBoxRef = useRef(null);
  const [message, setMessage] = useState("");
  const [IamTyping, setIamTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const [page, setPage ] = useState(1);
  const typingTimeout = useRef(null);
  const socket = useSocket();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  useEffect(() => {
    // Activate send button if there's input or emojis
    setSendButtonActive(
      inputValue.trim().length > 0 || chosenEmojis.length > 0
    );
  }, [inputValue, chosenEmojis]);

  const isValidMessage = (message) => {
    return message.trim() !== "";
  };




  



  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const data = await getMessages(chatId, page);
        setMessages(data?.messages);
        // setMessages((prevMessages) => [...prevMessages, ...data.messages]);
        setPage(data?.totalPages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [chatId, page,setMessages]);




  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setMessage(event.target.value);
    if (!IamTyping) {
      socket.emit(START_TYPING, { members, chatId });
      setIamTyping(true);
    }

    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      socket.emit(STOP_TYPING, { members, chatId });
      setIamTyping(false);
    }, [2000]);
  };

  const handleSendMessage = (event) => {
    if (event && event.key && event.key !== "Enter" && event.type !== "click")
      return;

    if (isValidMessage(inputValue) || chosenEmojis.length > 0) {
      const messageContent = inputValue + chosenEmojis.join("");
      setMessage(messageContent);
      if( !message ) return;
      console.log("Sendig msg: ",message);
      socket.emit(NEW_MESSAGE, { chatId, members, message });

      setMessage("");
      setInputValue("");
      setChosenEmojis([]);
      // setMessages((prevMessages) => [
      //   ...prevMessages,
      //   {
      //     attachments: [],
      //     content: messageContent,
      //     _id: selectUserDetails.userid,
      //     sender: {
      //       _id: userDetails?._id,
      //       name: userDetails?.username,
      //     },
      //     chat: "chatId",
      //     createdAt: new Date().toISOString(),
      //   },
      // ]);
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
