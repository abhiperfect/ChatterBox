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
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import Chip from "@mui/material/Chip";
import MyAvatar from "../ui/icons/MyAvatar.jsx";
import ChatOption from "../ui/buttons/ChatOption.jsx";
import VideoCallRoundedIcon from "@mui/icons-material/VideoCallRounded";
import VideoCallButton from "../ui/buttons/VideoCallButton.jsx";
import CallButton from "../ui/buttons/CallButton.jsx";
import { useSenderContext } from "../../context/UserContext.js";
import FriendAvatar from "../ui/icons/FriendAvatar.jsx";

const pages = [];

function HeaderOfSender({
  borderTopLeftRadius,
  borderBottomLeftRadius,
  borderTopRightRadius,
  borderBottomRightRadius,
  handleSetToggleIsOpen,
  handleMobileView,
}) {
  const settings = [
    handleMobileView && (
      <div style={{ display: "flex" }}>
        <CallButton handleMobileView={handleMobileView} />
        <VideoCallButton handleMobileView={handleMobileView} />
      </div>
    ),

    "Profile",
    "Account",
    "Dashboard",
    "logout",
  ];

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
  const { friendDetails } = useSenderContext();

  return (
    <AppBar
      position="static"
      sx={{
        borderTopLeftRadius: borderTopLeftRadius,
        borderTopRightRadius: borderTopRightRadius,
        borderBottomLeftRadius: borderBottomLeftRadius,
        borderBottomRightRadius: borderBottomRightRadius,
        backgroundColor: "#EDF2F4",
      }}
    >
      <Container maxWidth="xl" sx={{ color: "#EF233C" }}>
        <Toolbar disableGutters>
          {handleMobileView && (
            <ArrowBackIosRoundedIcon
              onClick={() => handleSetToggleIsOpen()}
              style={{ cursor: "pointer" }}
            />
          )}

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",

              textDecoration: "none",
            }}
          >
            <img
              src="./chatterboxLogo.png"
              alt=""
              srcset=""
              style={{ height: "50px" }}
            />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}></Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none", justifyContent: "center" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img
              src="./chatterboxLogo.png"
              alt=""
              srcset=""
              style={{ height: "50px" }}
            />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings" style={{ display: "flex" }}>
              <ChatOption />
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <FriendAvatar friendDetails={friendDetails} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "60px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting,index) => (
                <MenuItem key={index} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default HeaderOfSender;
