import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const UserContext = createContext();
const SenderContext = createContext();

export const UserProvider = ({ children }) => {
  const { isAuthenticated, user } = useAuth0();

  //May be repalced or remove
  const [userData, setUserData] = useState({
    userId: null,
    connectedUsers: [],
  });
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [messages, setMessages] = useState([]);

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
    isOnline:true,
  });

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
    <UserContext.Provider
      value={{
        userData,
        selectedUserId,
        setSelectedUserId,
        messages,
        setMessages,
        userDetails, 
        setUserDetails,
      }}
    >
      <SenderContext.Provider
        value={{ selectUserDetails, setSelectedUserDetails }}
      >
        {children}
      </SenderContext.Provider>
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
export const useSenderContext = () => useContext(SenderContext);
