import React from "react";
import axios from "axios";
import { server } from "../constants/config";
import { useUserContext } from "../context/UserContext";

const SearchComponent = () => {
  // Use the useUserContext hook inside the component
  const { setAllUserList } = useUserContext();

  const searchUsers = async (searchQuery) => {
    try {
      // Make a request to the search endpoint
      const response = await axios.get(`${server}/api/v1/user/search?name=${searchQuery}`, {
        withCredentials: true,
      });

      // Extract the users from the response
      const users = response.data.users;

      // Update the state with the search results
      setAllUserList(users);
    } catch (error) {
      console.error("Error searching users:", error);
      // Handle error
    }
  };
};

export default SearchComponent;
