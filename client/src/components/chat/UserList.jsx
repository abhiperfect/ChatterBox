import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { userListTextColor, userListBGColor, userListOnSelectBoxShadow } from "../../constants/color.jsx";
import { sampleUsers } from "../../constants/sampleData.js";
import { useSenderContext } from "../../context/UserContext.js";
import { useComponentContext } from "../../context/UserContext.js";
import { useUserContext } from "../../context/UserContext.js";

export default function UserList() {
  const { selectUserDetails, setSelectedUserDetails } = useSenderContext();
  const {isRightContainerOpen, setIsRightContainerOpen} = useComponentContext();
  const {userConnections, setUserConnections} = useUserContext();
   const userId = 1;
  const handleClick = (user) => {
      setSelectedUserDetails(
        {
          userid: user._id,
          username: user.name,
          profilepicture: "https://www.w3schools.com/howto/img_avatar.png",
          isOnline: user.isOnline,
          groupChat:user.groupChat,
        }
      );
      setIsRightContainerOpen(true);
  };

  return (
    <List sx={{ width: "100%", bgcolor: userListBGColor , color: userListTextColor }}>
      {userConnections.map((user) => {
        if (user._id !== userId) {
          return (
            <ListItem
              key={Math.random() * 100} // Use a unique key for each list item
              alignItems="flex-start"
              onClick={() => handleClick(user)} // Pass user.userid to handleClick
              sx={{
                boxShadow:
                selectUserDetails.userid === user._id
                    ? `0 0 10px ${userListOnSelectBoxShadow}`
                    : "none",
                transition: "box-shadow 0.3s ease",
              }}
            >
              <ListItemAvatar>
                <Avatar
                  alt={user.name}
                  src={user.avatar} // Assuming you have profilepicture in user object
                  sx={{ width: 55, height: 55 }}
                />
              </ListItemAvatar>
              <div className="chat-details">
                <div className="text-head">
                  <h4>{user.name}</h4>
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
