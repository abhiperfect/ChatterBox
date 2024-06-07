import React, { Fragment } from "react";
import { Button, Box } from "@mui/material";
import Badge from "@mui/material/Badge";
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
export default function StatusIcon() {
  return (
    <Fragment>
      <Box>
        <Badge color="secondary" badgeContent={3} max={99}>
          <DonutLargeIcon />
        </Badge>
      </Box>
    </Fragment>
  );
}
