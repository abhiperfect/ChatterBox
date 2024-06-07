import React, { Fragment } from "react";
import { Button, Box } from "@mui/material";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";

export default function NotificationsIcon() {
  return (
    <Fragment>
      <Box>
        <Badge color="secondary" badgeContent={10} max={99}>
          <MailIcon />
        </Badge>
      </Box>
    </Fragment>
  );
}
