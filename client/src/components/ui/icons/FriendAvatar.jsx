import React, { Fragment } from "react";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import {
  statusOnlineColor,
  statusOfflineColor,
} from "../../../constants/color";

export default function FriendAvatar({ backgroundColor, friendDetails }) {
  // Handle case where userDetails might be undefined
  console.log();

  const { _id, groupChat, avatar, name } = friendDetails || {};
  const friendProfile =
    avatar && avatar.length > 0
      ? avatar[0]
      : "https://www.w3schools.com/howto/img_avatar.png";
  const friendName = name == null ? "User" : name;

  const isOnline = true; //yet to be created
  const isGroup = groupChat;
  return (
    <Chip
      key={_id}
      sx={{
        width: "125px",
        height: "50px",
        fontSize: "1.2rem",
        borderRadius: "30px",
        backgroundColor: backgroundColor,
      }}
      avatar={
        <Avatar
          alt={friendName}
          src={friendProfile}
          sx={{ width: "40px", height: "40px" }}
        />
      }
      label={
        <Fragment>
          <Typography
            variant="body1"
            sx={{
              flexGrow: 1,
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              width: "100%",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            {friendName}
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
