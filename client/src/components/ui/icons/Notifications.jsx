import React, { Fragment } from "react";
import { Button, Box } from "@mui/material";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import { IconButton } from "@mui/material";
import NotificaionsDialogs from "../dialogs/NotificationDialogs";
import { useNotificationsContext } from "../../../context/UserContext";

export default function NotificationsIcon({badgeContent}) {
  const {friendRequestNotifications} = useNotificationsContext();

  const messageCount = friendRequestNotifications?.length;

  return (
    <NotificaionsDialogs>
      <Fragment>
        <IconButton>
          <Badge color="secondary" badgeContent={messageCount} max={99}>
            <MailIcon style={{
              color:'white'
            }} />
          </Badge>
        </IconButton>
      </Fragment>
    </NotificaionsDialogs>
  );
}
