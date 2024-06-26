import React, { Fragment } from "react";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import {
  statusOnlineColor,
  statusOfflineColor,
} from "../../../constants/color";

export default function MyAvatar({ backgroundColor, userDetails }) {
  const { _id, avatar, name, bio, username } = userDetails;
  const myName = name == null ? "User" : name;

  const isOnline = true;
  const isGroup = false;
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
          alt={myName}
          src={avatar?.url}
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
            {myName}
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
