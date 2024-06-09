import React, { Fragment } from "react";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { IconButton } from "@mui/material";
import NewGroupDialog from "../dialogs/NewGroupDialog";
export default function NewGroupIcon({ badgeContent }) {
  return (
    <NewGroupDialog>
      <Fragment>
        <IconButton>
          <GroupAddIcon sx={{ color: "white" }} />
        </IconButton>
      </Fragment>
    </NewGroupDialog>
  );
}
