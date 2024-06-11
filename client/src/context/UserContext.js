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
  const [selectUserDetails, setSelectedUserDetails] = useState();

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

  //MESSAGE CONTEXT

  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState([]);



  //NOTIFICATION CONTEXT
  const [friendRequestNotifications, setFriendRequestNotifications] =
    useState();

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
        chatId,
        setChatId,
        members,
        setMembers,
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
          <MessageContext.Provider value={{ messages, setMessages,newMessages, setNewMessages }}>
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
