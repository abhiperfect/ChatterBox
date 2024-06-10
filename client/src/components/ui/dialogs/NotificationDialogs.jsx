import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import FriendRequestNotification from "../template/FriendRequestNotification";
import { Box, Typography } from "@mui/material";
import { useNotificationsContext } from "../../../context/UserContext";
import { useMessageContext } from "../../../context/UserContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useUserContext } from "../../../context/UserContext";
import { server } from "../../../constants/config";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiPaper-root": {
    margin: 0,
    position: "fixed",
    left: "33px", // Maintain a gap of 33px from the left
    right: "40px", // Ensure a minimum gap of 40px from the right
    bottom: "102px",
    width: "auto", // Adjust width to fit within the constraints
    maxHeight: "300px",
    maxWidth: "500px",
  },
}));

export default function NotificationsDialog({ children }) {
  const [open, setOpen] = React.useState(false);
  const { friendRequestNotifications, setFriendRequestNotifications } =
    useNotificationsContext();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const { data } = await axios.get(
          `${server}/api/v1/user/notifications`,
          {
            withCredentials: true,
          }
        );

        const { allRequests } = data;
        setFriendRequestNotifications(allRequests);

        for (const noti of allRequests) {
          toast.success(`${noti.sender.name} sent you friend request`);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
        toast.error("Error fetching notifications");
      }
    };

    fetchNotifications();
  }, [setFriendRequestNotifications]);

  


  return (
    <React.Fragment>
      <IconButton onClick={handleClickOpen}>{children} </IconButton>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        scroll="paper"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Notifications
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box
            component="div"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2, // Add spacing between the notifications
            }}
          >
            {friendRequestNotifications &&
              friendRequestNotifications?.map((notification, index) => (
                <FriendRequestNotification
                  key={notification?._id}
                  requestId={notification?._id}
                  avatarSrc={notification?.sender?.avatar}
                  name={notification?.sender?.name}
                />
              ))}
            {!friendRequestNotifications && (
              <Typography>
                Currently, there are no new notifications to display. Check back
                later for updates or new friend requests.
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
