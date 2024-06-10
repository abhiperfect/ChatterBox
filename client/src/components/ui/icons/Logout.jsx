import React, { Fragment } from "react";
import { IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import {useLogoutHandler} from "../../../hooks/hooks"; // Correct import path

export default function Logout({ badgeContent }) {
  const logoutHandler = useLogoutHandler(); // Get the logoutHandler function from the hook

  const handleLogout = () => {
    logoutHandler(); 
  };

  return (
    <Fragment>
      <IconButton onClick={handleLogout} color="inherit" >
        <LogoutIcon style={{ color: "#ffffff" }} />
      </IconButton>
    </Fragment>
  );
}
