// UserContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react"; // Import useAuth0

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const { isAuthenticated ,user} = useAuth0(); // Get isAuthenticated from useAuth0
  const [userData, setUserData] = useState({ userId: null, connectedUsers: [] });

  useEffect(() => {
    if (isAuthenticated !== undefined) { // Check if isAuthenticated is defined
      const fetchUserData = async () => {
        try {
          console.log("Contextttt: ", user);
          const response = await axios.post("http://localhost:8000/api/authenticate", { user });
          if (response.status === 200 && isAuthenticated) {
            const { userId, connectedUsers } = response.data;
            setUserData({ userId, connectedUsers });
          } else {
            console.error("Failed to get user Data:", response.status);
            // Handle error or redirect to an error page
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUserData();
    }
  }, [isAuthenticated]); // Add isAuthenticated to the dependency array

  return (
    <UserContext.Provider value={{ userData }}>
      {children}
    </UserContext.Provider>
  );
};
