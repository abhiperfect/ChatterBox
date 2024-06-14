import React, { useState, useEffect, useRef } from "react";
import SendIcon from "@mui/icons-material/Send";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { IconButton } from "@mui/material";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import useTheme from "@mui/system/useTheme";
import { useMessageContext, useUserContext } from "../../context/UserContext";
import { useSocket } from "../../socket";
import {
  NEW_MESSAGE,
  START_TYPING,
  STOP_TYPING,
} from "../../constants/events.js";
import { getMessages } from "../apis/api.js";
import FileMenu from "../ui/dialogs/FileMenu.jsx";

const sendSoundPath = "/sound/send.mp3";
const receiveSoundPath = "/sound/receive.mp3";

export default function MessageInput() {
  const [inputValue, setInputValue] = useState("");
  const [sendButtonActive, setSendButtonActive] = useState(false);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [inputFocus, setInputFocus] = useState(false);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);

  const { setMessages } = useMessageContext();
  const { userDetails, chatId, members } = useUserContext();

  const theme = useTheme();
  const emojiPickerRef = useRef(null);
  const inputRef = useRef(null);
  const chatBoxRef = useRef(null);
  const [IamTyping, setIamTyping] = useState(false);
  const typingTimeout = useRef(null);
  const socket = useSocket();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  useEffect(() => {
    return () => {
      setMessages([]);
      setInputValue("");
      setPage(1);
    };
  }, [chatId, setMessages]);

  useEffect(() => {
    setSendButtonActive(inputValue.trim().length > 0);
  }, [inputValue]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const data = await getMessages(chatId, page);
        const sortedMessages = data.messages.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        setMessages((prevMessages) => [...prevMessages, ...sortedMessages]);

        if (page < data.totalPages) {
          setPage(page + 1);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [chatId, page, setMessages]);

  useEffect(() => {
    socket.on(NEW_MESSAGE, (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off(NEW_MESSAGE);
    };
  }, [socket, setMessages]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    if (!IamTyping) {
      socket.emit(START_TYPING, { members, chatId });
      setIamTyping(true);
    }

    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      socket.emit(STOP_TYPING, { members, chatId });
      setIamTyping(false);
    }, 2000);
  };

  const handleSendMessage = (event) => {
    if (event && event.key && event.key !== "Enter" && event.type !== "click")
      return;

    if (inputValue.trim()) {
      const message = inputValue.trim();
      socket.emit(NEW_MESSAGE, { chatId, members, message });

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          content: message,
          sender: {
            _id: userDetails?._id,
            name: userDetails?.username,
          },
          chat: chatId,
          createdAt: new Date().toISOString(),
        },
      ]);

      setInputValue("");
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

  const handleAttachFileClick = (event) => {
    setFileMenuAnchor(event.currentTarget);
  };

  const closeFileMenu = () => {
    setFileMenuAnchor(null);
  };

  const handleFileUpload = (uploadedFiles) => {
    uploadedFiles.forEach((file) => {
      socket.emit(NEW_MESSAGE, {
        chatId,
        members,
        message: file.url, // Assuming file.url is the URL of the uploaded file
      });

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          attachments: [file],
          sender: {
            _id: userDetails?._id,
            name: userDetails?.username,
          },
          chat: chatId,
          createdAt: new Date().toISOString(),
          type: file.type, // Assuming the backend returns the type of the file (image, video, etc.)
        },
      ]);
    });
  };

  return (
    <div className="chatbox-input" ref={chatBoxRef}>
      <IconButton
        sx={{
          position: "absolute",
          left: "1.0rem",
        }}
        onClick={handleAttachFileClick}
      >
        <AttachFileIcon />
      </IconButton>
      <FileMenu
        anchorEl={fileMenuAnchor}
        onClose={closeFileMenu}
        onFileUpload={handleFileUpload}
        chatId={chatId}
      />
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
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        onFocus={() => setInputFocus(true)}
        onBlur={() => setInputFocus(false)}
        style={{ width: "100%" }}
      />
      {sendButtonActive ? (
        <IconButton
          sx={{ position: "absolute", right: "0.8rem" }}
          onClick={handleSendMessage}
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
