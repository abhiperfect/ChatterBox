import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const UserContext = createContext();
const SenderContext = createContext();
const ComponentContext = createContext();
const MessageContext = createContext();
const NotificationsContext = createContext();

export const UserProvider = ({ children }) => {
  const { isAuthenticated, user } = useAuth0();

  //May be repalced or remove
  const [userData, setUserData] = useState({
    userId: null,
    connectedUsers: [],
  });
  const [selectedUserId, setSelectedUserId] = useState(null);

  //new way to creating
  const [selectUserDetails, setSelectedUserDetails] = useState({
    userId: 1000,
    username: "NO-User",
    profilePicture: "https://www.w3schools.com/howto/img_avatar.png",
    isOnline: false,
  });

  const [userDetails, setUserDetails] = useState({
    userid: 1,
    username: "Alice",
    profilepicture: "https://www.w3schools.com/howto/img_avatar.png",
    isOnline: true,
  });
  const [isRightContainerOpen, setIsRightContainerOpen] = useState(false);

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

  useEffect(() => {
    const fetchMessages = async () => {
      if (userData.userId && selectedUserId) {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/messages/${userData.userId}/${selectedUserId}`
          );
          setMessages(response.data);
          console.log("I got messages:", response.data);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      }
    };

    fetchMessages();
  }, [userData.userId, selectedUserId]);

  useEffect(() => {
    if (isAuthenticated !== undefined && user) {
      const fetchUserData = async () => {
        try {
          console.log("Context:", user);
          const response = await axios.post(
            "http://localhost:8000/api/authenticate",
            { user }
          );
          if (response.status === 200 && isAuthenticated) {
            const { userId, connectedUsers } = response.data;
            setUserData({ userId, connectedUsers });
          } else {
            console.error("Failed to get user data:", response.status);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUserData();
    }
  }, [isAuthenticated, user]);

  return (
    <UserContext.Provider value={{ userDetails, setUserDetails }}>
      <SenderContext.Provider
        value={{ selectUserDetails, setSelectedUserDetails }}
      >
        <ComponentContext.Provider
          value={{ isRightContainerOpen, setIsRightContainerOpen }}
        >
          <MessageContext.Provider value={{ messages, setMessages }}>
            <NotificationsContext.Provider value={{friendRequestNotifications, setFriendRequestNotifications}}>
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
