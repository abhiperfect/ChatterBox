import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import { useUserContext } from "../../context/UserContext.js";
import { userListTextColor, userListBGColor, userListOnSelectBoxShadow } from "../../constants/color.jsx";
import { sampleUsers } from "../../constants/sampleData.js";
import { useSenderContext } from "../../context/UserContext.js";
import { useComponentContext } from "../../context/UserContext.js";


export default function UserList() {
  const { selectUserDetails, setSelectedUserDetails } = useSenderContext();
  const {isRightContainerOpen, setIsRightContainerOpen} = useComponentContext();

  const userId = 1;
  const handleClick = (user) => {
      setSelectedUserDetails(
        {
          userid: user.userid,
          username: user.username,
          profilepicture: "https://www.w3schools.com/howto/img_avatar.png",
          isOnline: user.isOnline
        }
      );
      setIsRightContainerOpen(true);
  };

  return (
    <List sx={{ width: "100%", bgcolor: userListBGColor , color: userListTextColor }}>
      {sampleUsers.map((user) => {
        if (user.userid !== userId) {
          return (
            <ListItem
              key={user.userid} // Use a unique key for each list item
              alignItems="flex-start"
              onClick={() => handleClick(user)} // Pass user.userid to handleClick
              sx={{
                boxShadow:
                selectUserDetails.userid === user.userid
                    ? `0 0 10px ${userListOnSelectBoxShadow}`
                    : "none",
                transition: "box-shadow 0.3s ease",
              }}
            >
              <ListItemAvatar>
                <Avatar
                  alt={user.username}
                  src={user.profilepicture} // Assuming you have profilepicture in user object
                  sx={{ width: 55, height: 55 }}
                />
              </ListItemAvatar>
              <div className="chat-details">
                <div className="text-head">
                  <h4>{user.username}</h4>
                  <p className="time unread">{user.lastMessageTime}</p>
                </div>
                <div className="text-message">
                  <p>{user.lastMessage}</p>
                  {user.unreadMessages > 0 && <b>{user.unreadMessages}</b>}
                </div>
              </div>
            </ListItem>
          );
        }
        return null; // Return null if user.userid is equal to userId
      })}
    </List>
  );
}
