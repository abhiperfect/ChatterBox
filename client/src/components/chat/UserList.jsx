import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import { useUserContext } from "../../context/UserContext.js";

export default function UserList({ onItemClick }) {
  const { userData } = useUserContext();
  const { userId, connectedUsers } = userData;
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClick = (id) => {
    if (typeof onItemClick === "function") {
      onItemClick(id);
      setSelectedItem(id);
    }
  };

  return (
    <List sx={{ width: "100%", bgcolor: "#EDF2F4", color: "#0E0D0E" }}>
      {connectedUsers.map((user) => {
        if (user.userid !== userId) {
          return (
            <ListItem
              key={user.userid} // Use a unique key for each list item
              alignItems="flex-start"
              onClick={() => handleClick(user.userid)} // Pass user.userid to handleClick
              sx={{
                boxShadow:
                  selectedItem === user.userid
                    ? "0 0 10px rgba(0, 0, 0, 0.2)"
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
                  <p className="time unread">2.55</p>
                </div>
                <div className="text-message">
                  <p>How about you? How's everything going on your end?</p>
                  {1 > 0 && <b>1</b>}
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
