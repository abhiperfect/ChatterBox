import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { server } from "../constants/config";

const UserContext = createContext();
const SenderContext = createContext();
const ComponentContext = createContext();
const MessageContext = createContext();
const NotificationsContext = createContext();

export const UserProvider = ({ children }) => {
  //SENDER CONTEXT
  const [selectUserDetails, setSelectedUserDetails] = useState({
    userId: 1000,
    username: "NO-User",
    profilePicture: "https://www.w3schools.com/howto/img_avatar.png",
    isOnline: false,
  });

  //USER CONTEXT

  //DETAIL OF CURRENT USER LOGIN
  const [userDetails, setUserDetails] = useState();

  //THIS FOR FRIENDS LIST AND ADD FRIENDS IN NEW GROUP
  const [userConnections, setUserConnections] = useState([
    {
      _id: "1",
      name: "John Doe",
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      groupChat: false,
      members: ["1", "2"],
      lastMessage: "Did you complete the project?",
      lastMessageTime: "1:20 PM",
      unreadMessages: 0,
      isOnline: false,
    },

    {
      _id: "2",
      name: "John Boi",
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      groupChat: true,
      members: ["1", "2"],
      lastMessage: "How about you? How's everything going on your end?",
      lastMessageTime: "2:55 PM",
      unreadMessages: 1,
      isOnline: true,
    },
    {
      _id: "3",
      name: "Alice",
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      groupChat: false,
      members: ["1", "2"],
      lastMessage: "Did you complete the project?",
      lastMessageTime: "1:20 PM",
      unreadMessages: 0,
      isOnline: true,
    },
  ]);

  //THIS FOR SEARCHING NEW FRIENDS
  const [allUserList, setAllUserList] = useState();

  //COMPONENT CONTEXT
  const [isRightContainerOpen, setIsRightContainerOpen] = useState(false);

  const [isSearchBarOpen, setSearchBarOpen] = useState(false);

  const [loader, setLoader] = useState(true);

  //MESSAGE CONTEXT

  const [messages, setMessages] = useState([
    {
      attachments: [],
      content: "Piyush ka Message hai",
      _id: "sfnsdjkfsdnfkjsbnd",
      sender: {
        _id: "2",
        name: "Chaman ",
      },
      chat: "chatId",
      createdAt: "2024-02-12T10:41:30.630Z",
    },

    {
      attachments: [
        {
          public_id: "asdsad 2",
          url: "https://www.w3schools.com/howto/img_avatar.png",
        },
      ],
      content: "",
      _id: "1",
      sender: {
        _id: "1",
        name: "Chaman  2",
      },
      chat: "chatId",
      createdAt: "2024-02-12T10:41:30.630Z",
    },
    {
      attachments: [],
      content: "Raman ka Message hai",
      _id: "sfnsdjkfsdnfkjsbnd",
      sender: {
        _id: "1",
        name: "Chaman ",
      },
      chat: "chatId",
      createdAt: "2024-02-12T10:41:30.630Z",
    },

    {
      attachments: [
        {
          public_id: "asdsad 2",
          url: "https://www.w3schools.com/howto/img_avatar.png",
        },
      ],
      content: "",
      _id: "1",
      sender: {
        _id: "2",
        name: "Chaman  2",
      },
      chat: "chatId",
      createdAt: "2024-02-12T10:41:30.630Z",
    },
    {
      attachments: [],
      content: "Charan ka Message hai",
      _id: "sfnsdjkfsdnfkjsbnd",
      sender: {
        _id: "2",
        name: "Chaman ",
      },
      chat: "chatId",
      createdAt: "2024-02-12T10:41:30.630Z",
    },

    {
      attachments: [
        {
          public_id: "asdsad 2",
          url: "https://www.w3schools.com/howto/img_avatar.png",
        },
      ],
      content: "",
      _id: "1",
      sender: {
        _id: "1",
        name: "Chaman  2",
      },
      chat: "chatId",
      createdAt: "2024-02-12T10:41:30.630Z",
    },
    {
      attachments: [],
      content: "Aman ka Message hai",
      _id: "sfnsdjkfsdnfkjsbnd",
      sender: {
        _id: "1",
        name: "Chaman ",
      },
      chat: "chatId",
      createdAt: "2024-02-12T10:41:30.630Z",
    },

    {
      attachments: [
        {
          public_id: "asdsad 2",
          url: "https://www.w3schools.com/howto/img_avatar.png",
        },
      ],
      content: "",
      _id: "1",
      sender: {
        _id: "2",
        name: "Chaman  2",
      },
      chat: "chatId",
      createdAt: "2024-02-12T10:41:30.630Z",
    },
  ]);

  //NOTIFICATION CONTEXT
  const [friendRequestNotifications, setFriendRequestNotifications] = useState([
    {
      sender: {
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
        name: "John Doe",
      },
      _id: "1",
    },
    {
      sender: {
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
        name: "John Boi",
      },
      _id: "2",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

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
      }}
    >
      <SenderContext.Provider
        value={{ selectUserDetails, setSelectedUserDetails }}
      >
        <ComponentContext.Provider
          value={{
            isRightContainerOpen,
            setIsRightContainerOpen,
            isSearchBarOpen,
            setSearchBarOpen,
            loader,
            setLoader,
          }}
        >
          <MessageContext.Provider value={{ messages, setMessages }}>
            <NotificationsContext.Provider
              value={{
                friendRequestNotifications,
                setFriendRequestNotifications,
              }}
            >
              {children}
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
