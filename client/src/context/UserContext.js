import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const UserContext = createContext();
const SenderContext = createContext();
const ComponentContext = createContext();
const MessageContext = createContext();
const NotificationsContext = createContext();

export const UserProvider = ({ children }) => {
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
    groupChat:false,
  });
  
  const [userConnections, setUserConnections ] = useState(
    [
      {
        _id: "1",
        name: "John Doe",
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
        groupChat: false,
        members: ["1", "2"],
        lastMessage: "Did you complete the project?",
        lastMessageTime: "1:20 PM",
        unreadMessages: 0,
        isOnline:false,
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
        isOnline:true,
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
        isOnline:true,
      },
    ]
  );
  

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

  return (
    <UserContext.Provider value={{ userDetails, setUserDetails,userConnections, setUserConnections }}>
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
