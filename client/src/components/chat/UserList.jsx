import React, { useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import {
  userListTextColor,
  userListBGColor,
  userListOnSelectBoxShadow,
} from "../../constants/color.jsx";
import { useSenderContext, useComponentContext, useUserContext } from "../../context/UserContext.js";
import { server } from "../../constants/config.jsx";
import toast from "react-hot-toast";
import axios from "axios";
import Chip from '@mui/material/Chip';

export default function UserList() {
  const { friendDetails, setFriendDetails } = useSenderContext();
  const { isRightContainerOpen, setIsRightContainerOpen } = useComponentContext();
  const { userConnections, setUserConnections } = useUserContext();
  const userId = 1; // Assuming userId is defined here
  const { chatId, setChatId } = useUserContext();

  useEffect(() => {
    const fetchChatData = async () => {
      try {
        const response = await axios.get(`${server}/api/v1/chat/my`, {
          withCredentials: true,
        });
        const { chats } = response.data;
        setUserConnections(chats);
      } catch (error) {
        console.error("Error fetching chat data:", error);
        toast.error("Error fetching chat data");
      }
    };
    fetchChatData();
  }, []);

  const handleClick = (user) => {
    setChatId(user._id);
    setFriendDetails(user);
    setIsRightContainerOpen(true);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <List sx={{ width: "100%", maxWidth: '500px', bgcolor: "#c6e5f1", color: userListTextColor }}>
        {userConnections?.map((user, index) => {
          if (user?._id !== userId) {
            return (
              <React.Fragment key={index}>
                <ListItem
                  alignItems="flex-start"
                  onClick={() => handleClick(user)}
                  sx={{
                    backgroundColor: userListBGColor,
                    boxShadow:
                      chatId === user?._id ? `0 0 10px ${userListOnSelectBoxShadow}` : "none",
                    transition: "box-shadow 0.3s ease",
                    cursor: "pointer",
                    '&:hover': {
                      backgroundColor: "#f5f3f3",
                    },
                    borderRadius: "8px",
                    margin: "8px 0",
                    width: '90%', // Set width to 90% of its container
                    maxWidth: '500px', // Optionally, set a maximum width
                    marginLeft: 'auto',
                    marginRight: 'auto', // Center the item within its container
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      alt={user?.name}
                      src={user?.avatar}
                      sx={{ width: 55, height: 55 }}
                    />
                  </ListItemAvatar>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="h6" noWrap
                      >
                        {user.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" noWrap>
                        {user?.lastMessageTime}
                      </Typography>
                    </div>
                    <Typography variant="body2" color="textSecondary" noWrap>
                      {user.lastMessage}
                    </Typography>
                    {user.unreadMessages > 0 && (
                      <Typography variant="caption" color="error">
                        {user?.unreadMessages} unread
                      </Typography>
                    )}
                  </div>

                </ListItem>
                {index < userConnections.length - 1 && <Divider/>}
              </React.Fragment>
            );
          }
          return null; // Return null if user._id is equal to userId
        })}
      </List>
    </div>
  );
}
