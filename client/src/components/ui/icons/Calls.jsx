import React, { Fragment } from "react";
import { Button, Box } from "@mui/material";
import Badge from "@mui/material/Badge";
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
export default function CallsIcon() {
  return (
    <Fragment>
      <Box>
        <Badge color="secondary" badgeContent={1} max={99}>
          <PermPhoneMsgIcon />
        </Badge>
      </Box>
    </Fragment>
  );
}
