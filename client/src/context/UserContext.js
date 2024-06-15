import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useReducer,
} from "react";
import axios from "axios";
import { server } from "../constants/config";
import { getOrSaveFromStorage } from "../lib/features";
import { NEW_MESSAGE_ALERT } from "../constants/events";

const initialState = {
  notificationCount: 0,
  newMessagesAlert: getOrSaveFromStorage({
    key: NEW_MESSAGE_ALERT,
    get: true,
  }) || [
    {
      chatId: "",
      count: 0,
    },
  ],
};

const chatReducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT_NOTIFICATION":
      return {
        ...state,
        notificationCount: state.notificationCount + 1,
      };
    case "RESET_NOTIFICATION_COUNT":
      return {
        ...state,
        notificationCount: 0,
      };
    case "SET_NEW_MESSAGES_ALERT":
      const chatId = action.payload.chatId;
      const index = state.newMessagesAlert.findIndex(
        (item) => item.chatId === chatId
      );
      if (index !== -1) {
        state.newMessagesAlert[index].count += 1;
      } else {
        state.newMessagesAlert.push({
          chatId,
          count: 1,
        });
      }
      return {
        ...state,
        newMessagesAlert: [...state.newMessagesAlert],
      };
    case "REMOVE_NEW_MESSAGES_ALERT":
      return {
        ...state,
        newMessagesAlert: state.newMessagesAlert.filter(
          (item) => item.chatId !== action.payload
        ),
      };
    default:
      return state;
  }
};

const UserContext = createContext();
const SenderContext = createContext();
const ComponentContext = createContext();
const MessageContext = createContext();
const NotificationsContext = createContext();
const FileMenuContext = createContext();
const ChatContext = createContext();

export const UserProvider = ({ children }) => {
  //SENDER CONTEXT
  const [friendDetails, setFriendDetails] = useState();

  //USER CONTEXT
  const [chatId, setChatId] = useState();
  const [members, setMembers] = useState();

  //DETAIL OF CURRENT USER LOGIN
  const [userDetails, setUserDetails] = useState();

  //THIS FOR FRIENDS LIST AND ADD FRIENDS IN NEW GROUP
  const [userConnections, setUserConnections] = useState([]);

  //THIS FOR SEARCHING NEW FRIENDS
  const [allUserList, setAllUserList] = useState();

  //COMPONENT CONTEXT
  const [isRightContainerOpen, setIsRightContainerOpen] = useState(false);

  const [isSearchBarOpen, setSearchBarOpen] = useState(false);

  const [loader, setLoader] = useState(true);

  const [chatLoader, setChatLoader] = useState(true);

  //MESSAGE CONTEXT

  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState([]);

  //NOTIFICATION CONTEXT
  const [friendRequestNotifications, setFriendRequestNotifications] =
    useState();

  const [searchQuery, setSearchQuery] = useState("");

  //FILE MENU CONTEXT
  const [isFileMenuOpen, setIsFileMenuOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  //CHAT CONTEXT
  const [state, dispatch] = useReducer(chatReducer, initialState);

  const setNewMessagesAlert = (chatId) => {
    dispatch({ type: "SET_NEW_MESSAGES_ALERT", payload: { chatId } });
  };

  const removeNewMessagesAlert = (chatId) => {
    dispatch({ type: "REMOVE_NEW_MESSAGES_ALERT", payload: chatId });
  };

  const incrementNotification = () => {
    dispatch({ type: "INCREMENT_NOTIFICATION" });
  };

  const resetNotificationCount = () => {
    dispatch({ type: "RESET_NOTIFICATION_COUNT" });
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      fetchSearchResults();
    }, 0);

    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(
          `${server}/api/v1/user/search?name=${searchQuery}`,
          {
            withCredentials: true,
          }
        );
        const users = response.data.users;
        setAllUserList(users);
      } catch (error) {
        console.error("Error searching users:", error);
      }
    };
    return () => {
      clearTimeout(timeOutId);
    };
  }, [searchQuery, setAllUserList]);

  return (
    <UserContext.Provider
      value={{
        userDetails,
        setUserDetails,
        userConnections,
        setUserConnections,
        allUserList,
        setAllUserList,
        searchQuery,
        setSearchQuery,
        chatId,
        setChatId,
        members,
        setMembers,
      }}
    >
      <SenderContext.Provider value={{ friendDetails, setFriendDetails }}>
        <ComponentContext.Provider
          value={{
            isRightContainerOpen,
            setIsRightContainerOpen,
            isSearchBarOpen,
            setSearchBarOpen,
            loader,
            setLoader,
            chatLoader,
            setChatLoader,
          }}
        >
          <MessageContext.Provider
            value={{ messages, setMessages, newMessages, setNewMessages }}
          >
            <NotificationsContext.Provider
              value={{
                friendRequestNotifications,
                setFriendRequestNotifications,
              }}
            >
              <FileMenuContext.Provider
                value={{
                  isFileMenuOpen,
                  setIsFileMenuOpen,
                  isUploading,
                  setIsUploading,
                }}
              >
                <ChatContext.Provider
                  value={{
                    state,
                    setNewMessagesAlert,
                    removeNewMessagesAlert,
                    incrementNotification,
                    resetNotificationCount,
                  }}
                >
                  {children}
                </ChatContext.Provider>
              </FileMenuContext.Provider>
            </NotificationsContext.Provider>
          </MessageContext.Provider>
        </ComponentContext.Provider>
      </SenderContext.Provider>
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
export const useSenderContext = () => useContext(SenderContext);
export const useComponentContext = () => useContext(ComponentContext);
export const useMessageContext = () => useContext(MessageContext);
export const useNotificationsContext = () => useContext(NotificationsContext);
export const useFileMenuContext = () => useContext(FileMenuContext);
export const useChatContext = () => useContext(ChatContext);