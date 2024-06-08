import React, { Fragment } from "react";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import {
  statusOnlineColor,
  statusOfflineColor,
} from "../../../constants/color";

export default function MyAvatar({ backgroundColor, userDetails }) {
  // Handle case where userDetails might be undefined
  const username = userDetails?.username || "Unknown User";
  const profilePicture =
    userDetails?.profilepicture || "/static/images/default-avatar.png";
  const isOnline = userDetails?.isOnline || false;
  const isGroup = userDetails?.groupChat || false;
  return (
    <Chip
      sx={{
        width: "125px",
        height: "50px",
        fontSize: "1.2rem",
        borderRadius: "30px",
        backgroundColor: backgroundColor,
      }}
      avatar={
        <Avatar
          alt={username}
          src={profilePicture}
          sx={{ width: "40px", height: "40px" }}
        />
      }
      label={
        <Fragment>
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", fontSize: "18px" }}
          >
            {username}
          </Typography>
          {isGroup ? (
            <Typography
              variant="body2"
              sx={{
                fontSize: "10px",
                color: "tomato",
              }}
            >
              Group Chat
            </Typography>
          ) : isOnline ? (
            <Typography
              variant="body2"
              sx={{
                fontSize: "12px",
                color: statusOnlineColor,
                animation: "blinking 2s infinite",
              }}
            >
              Online
            </Typography>
          ) : (
            <Typography
              variant="body2"
              sx={{
                fontSize: "12px",
                color: statusOfflineColor,
                animation: "blinking 3s infinite",
              }}
            >
              Offline
            </Typography>
          )}
        </Fragment>
      }
    />
  );
}
