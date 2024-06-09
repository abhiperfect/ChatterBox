import React,{useState} from "react";
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

export default function LeftContainer() {
  const { isSearchBarOpen } = useComponentContext();
  const {allUserList} = useUserContext();
  
  const [isLoadingSendFriendRequest, setIsLoadingSendFriendRequest] = useState(false);
  const addFriendHandler = (userId) => {
    // Handle friend request logic here
    setIsLoadingSendFriendRequest(true);
    // Simulating a network request
    setTimeout(() => {
      setIsLoadingSendFriendRequest(false);
      alert(`Friend request sent to user with ID: ${userId}`);
    }, 2000);
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
              {allUserList.map((user) => (
                <UserItem
                  user={user}
                  key={user._id}
                  handler={() => addFriendHandler(user._id)}
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
