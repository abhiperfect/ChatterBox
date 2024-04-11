import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useState } from "react";

export default function UserList({ onItemClick }) {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClick = (id) => {
    console.log("UserList got clicked: ", id);
    // Call onItemClick function if it's a function
    if (typeof onItemClick === "function") {
      onItemClick(id);
      setSelectedItem(id);
    }
  };

  return (
    <List sx={{ width: "100%", bgcolor: "#EDF2F4", color: "#0E0D0E" }}>
      <ListItem
        key={1}
        index={1}
        alignItems="flex-start"
        onClick={() => handleClick(1)}
        sx={{
          boxShadow:
            selectedItem === 1 ? "0 0 10px rgba(0, 0, 0, 0.2)" : "none",
          transition: "box-shadow 0.3s ease",
        }}
      >
        <ListItemAvatar>
          <Avatar
            alt="Elon Musk"
            src="/static/images/avatar/1.jpg"
            sx={{ width: 55, height: 55 }}
          />
        </ListItemAvatar>
        <div className="chat-details">
          <div className="text-head">
            <h4> Elon Musk</h4>
            <p className="time unread">2.55</p>
          </div>
          <div className="text-message">
            <p>How about you? How's everything going on your end?</p>
            {1 > 0 && <b>1</b>}
          </div>
        </div>
      </ListItem>

      <ListItem
        key={2}
        alignItems="flex-start"
        onClick={() => handleClick(2)}
        sx={{
          boxShadow:
            selectedItem === 2 ? "0 0 10px rgba(0, 0, 0, 0.2)" : "none",
          transition: "box-shadow 0.3s ease",
        }}
      >
        <ListItemAvatar>
          <Avatar
            alt="John Doe"
            src="/static/images/avatar/2.jpg"
            sx={{ width: 55, height: 55 }}
          />
        </ListItemAvatar>
        <div className="chat-details">
          <div className="text-head">
            <h4> John Doe</h4>
            <p className="time unread">2.55</p>
          </div>
          <div className="text-message">
            <p>I understand. Work can be hectic sometimes.</p>
            {1 > 0 && <b>1</b>}
          </div>
        </div>
      </ListItem>

      <ListItem
        key={3}
        alignItems="flex-start"
        onClick={() => handleClick(3)}
        sx={{
          boxShadow:
            selectedItem === 3 ? "0 0 10px rgba(0, 0, 0, 0.2)" : "none",
          transition: "box-shadow 0.3s ease",
        }}
      >
        <ListItemAvatar>
          <Avatar
            alt="Mark Zukerbarg"
            src="/static/images/avatar/3.jpg"
            sx={{ width: 55, height: 55 }}
          />
        </ListItemAvatar>
        <div className="chat-details">
          <div className="text-head">
            <h4> Mark Zukerbarg</h4>
            <p className="time unread">2.55</p>
          </div>
          <div className="text-message">
            <p>It's going pretty well. Just relaxing at home.</p>
            {1 > 0 && <b>1</b>}
          </div>
        </div>
      </ListItem>
    </List>
  );
}
