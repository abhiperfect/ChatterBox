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
  useChatContext
} from "../../context/UserContext";
import { useSocket } from "../../socket";
import {
  NEW_MESSAGE,
  NEW_MESSAGE_ALERT,
  START_TYPING,
  STOP_TYPING,
  ONLINE_USERS,
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
  const [typingStatus, setTypingStatus] = useState({});
  const [userInteracted, setUserInteracted] = useState(false);

  const { setMessages } = useMessageContext();
  const { userDetails, chatId, members } = useUserContext();
  const { friendDetails, setFriendDetails } = useSenderContext();
  const { state, setNewMessagesAlert } = useChatContext();

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
    if (!socket) return;

    const handleNewMessage = ({ chatId, message }) => {
      if (friendDetails?._id === chatId) {
        const urlPattern = /https?:\/\/[^\s]+/;
        const urls = message.content.match(urlPattern);

        const attachments = urls ? urls.map(url => ({ url })) : [];

        const newMessage = {
          _id: message._id,
          content: urls ? '' : message.content,
          attachments,
          sender: message.sender,
          chat: chatId,
          createdAt: message.createdAt,
          updatedAt: message.updatedAt,
        };

        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    };

    const handleNewMessageAlert = ({ chatId }) => {

      if (userInteracted ) {
        const audio = new Audio(receiveSoundPath);
        audio.play().catch((error) => {
          console.error("Audio play failed:", error);
        });
      }
      if (chatId === friendDetails?._id) return;
      setNewMessagesAlert(chatId);

    };

    const handleTyping = ({ chatId, userId, typing }) => {
      setTypingStatus((prevStatus) => ({
        ...prevStatus,
        [userId]: typing,
      }));
    };

    const handleOnlineUsers = (onlineUsers) => {
      // Handle online users update
    };

    socket.on(NEW_MESSAGE, handleNewMessage);
    socket.on(NEW_MESSAGE_ALERT, handleNewMessageAlert);
    socket.on(START_TYPING, ({ chatId, userId }) =>
      handleTyping({ chatId, userId, typing: true })
    );
    socket.on(STOP_TYPING, ({ chatId, userId }) =>
      handleTyping({ chatId, userId, typing: false })
    );
    socket.on(ONLINE_USERS, handleOnlineUsers);

    return () => {
      socket.off(NEW_MESSAGE, handleNewMessage);
      socket.off(NEW_MESSAGE_ALERT, handleNewMessageAlert);
      socket.off(START_TYPING, ({ chatId, userId }) =>
        handleTyping({ chatId, userId, typing: true })
      );
      socket.off(STOP_TYPING, ({ chatId, userId }) =>
        handleTyping({ chatId, userId, typing: false })
      );
      socket.off(ONLINE_USERS, handleOnlineUsers);
    };
  }, [friendDetails, socket, setMessages, setNewMessagesAlert, userDetails, userInteracted]);

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
    if (event && event.key && event.key !== "Enter" && event.type !== "click") return;
    if (inputValue.trim()) {
      const message = inputValue.trim();
      socket.emit(NEW_MESSAGE, { chatId, members, message });
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
    });
  };

  const handleUserInteraction = () => {
    if (!userInteracted) {
      setUserInteracted(true);
    }
  };

  return (
    <div className="chatbox-input" ref={chatBoxRef} onClick={handleUserInteraction}>
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
