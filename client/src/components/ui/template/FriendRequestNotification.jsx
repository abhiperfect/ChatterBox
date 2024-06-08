import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const FriendRequestNotifications = ({
  avatarSrc,
  name,
  message,
  onAccept,
  onReject,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        width: "auto",
        justifyContent:'space-between',
      }}
    >
      <Avatar
        src={avatarSrc}
        sx={{ width: "40px", height: "40px", marginBottom: "" }}
      />
      <Typography variant="body1" sx={{ marginBottom: "20px" }}>
        {message}
      </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width:'auto',
            justifyContent:'center',
            alignItems:'center',
            gap:'5px',
            flexWrap:'wrap'
              
          }}
        >
          <Typography variant="h6">{name}</Typography>
          <Typography variant="body2" color="textSecondary">
            sent you a friend request
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "auto",
            justifyContent:'center',
            alignItems:'center',
            gap:'5px'
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={onAccept}
            sx={{

              width: "50px",
              height: "33px",
              fontSize: "small",
            }}
          >
            Accept
          </Button>
          <Button variant="text" color="error" onClick={onReject}
          sx={{
            width: "50px",
            height: "33px",
            fontSize: "small",
          }}>
            Reject
          </Button>
        </Box>
    </Box>
  );
};

export default FriendRequestNotifications;
