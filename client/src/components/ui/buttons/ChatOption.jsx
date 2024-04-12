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
import VideoCallButton from "./VideoCallButton";
import CallButton from "./CallButton";


const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

export default function ChatOption() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <Toolbar disableGutters style={{ marginLeft: "10px", marginRight:'10px' }}>
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          <CallButton/>
          <VideoCallButton/>
        </Box>
      </Toolbar>
    </>
  );
}
