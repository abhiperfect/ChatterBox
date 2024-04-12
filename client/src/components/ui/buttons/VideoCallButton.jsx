import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import DeleteIcon from "@mui/icons-material/Delete";
import CallRoundedIcon from "@mui/icons-material/CallRounded";
import VideoCallRoundedIcon from "@mui/icons-material/VideoCallRounded";

export default function VideoCallButton({ handleMobileView }) {
  return (
    <IconButton
      sx={{ my: handleMobileView ? 0 : 2, color: "#EF233C", display: "block" }}
      aria-label="delete"
    >
      <VideoCallRoundedIcon />
    </IconButton>
  );
}
