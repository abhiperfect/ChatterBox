import React, { Fragment } from "react";
import { Button, Box } from "@mui/material";
import Badge from "@mui/material/Badge";
import SettingsIcon from '@mui/icons-material/Settings';
export default function SettingIcon() {
  return (
    <Fragment>
      <Box>
        <Badge color="secondary" badgeContent={0} max={99}>
          <SettingsIcon />
        </Badge>
      </Box>
    </Fragment>
  );
}
