import React, { useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { Input } from "@mui/material";
import { useUserContext } from "../../../context/UserContext";
import UserItem from "../../common/UserItem";
import { Box } from "@mui/material";

const color = red[500];

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function NewGroupDialog({ children }) {
  const [open, setOpen] = React.useState(false);
  const { userConnections } = useUserContext();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [isLoadingSendFriendRequest, setIsLoadingSendFriendRequest] =
    useState(false);
  const addFriendHandler = (userId) => {
    // Handle friend request logic here
    setIsLoadingSendFriendRequest(true);
    // Simulating a network request
    setTimeout(() => {
      setIsLoadingSendFriendRequest(false);
      alert(`Friend request sent to user with ID: ${userId}`);
    }, 2000);
  };
  return (
    <React.Fragment>
      <Button onClick={handleClickOpen}>{children}</Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          New Group
        </DialogTitle>
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
        <DialogContent dividers>
          <Input  placeholder="Group Name" />
          <Box>
            {userConnections.map((user) => (
              <UserItem
                user={user}
                key={user._id}
                handler={() => addFriendHandler(user._id)}
                handlerIsLoading={isLoadingSendFriendRequest}
              />
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Create
          </Button>
          <Button autoFocus sx={{ color: "red" }} onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
