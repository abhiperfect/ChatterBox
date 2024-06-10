import React, { useState } from "react";
import SimpleContainer from "../common/SimpleContainer";
import UserList from "./UserList";
import SearchBar from "../common/SearchBar";
import { backgroundColor } from "../../constants/color";
import { Typography } from "@mui/material";
import { useComponentContext } from "../../context/UserContext";
import { Box } from "@mui/material";
import UserItem from "../common/UserItem";
import { sampleUsers } from "../../constants/sampleData";
import { useUserContext } from "../../context/UserContext";
import axios from "axios";
import { server } from "../../constants/config";
import toast from "react-hot-toast";

export default function LeftContainer() {
  const { isSearchBarOpen } = useComponentContext();
  const { allUserList, userDetails } = useUserContext();

  const [isLoadingSendFriendRequest, setIsLoadingSendFriendRequest] =
    useState(false);

  const addFriendHandler = async (userId, name) => {
    setIsLoadingSendFriendRequest(true);
    try {
      // Make a request to the send friend request endpoint
      const response = await axios.put(
        `${server}/api/v1/user/sendrequest`,
        { userId },
        { withCredentials: true }
      );
      toast.success(`Friend request sent to ${name}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoadingSendFriendRequest(false);
    }
  };

  return (
    <>
      <div style={{ paddingLeft: "0px", paddingRight: "0px" }}>
        <SearchBar borderTopLeftRadius="20px" />
        <SimpleContainer
          backgroundColor={backgroundColor}
          height="73vh"
          cursor="pointer"
        >
          {!isSearchBarOpen && <UserList />}
          {isSearchBarOpen && (
            <Box>
            {allUserList
              ?.filter(user => user?._id !== userDetails?._id)
              ?.map(user => (
                <UserItem
                  user={user}
                  key={user?._id}
                  handler={() => addFriendHandler(user?._id, user?.name)}
                  handlerIsLoading={isLoadingSendFriendRequest}
                />
              ))}
          </Box>
          )}
        </SimpleContainer>
      </div>
    </>
  );
}
