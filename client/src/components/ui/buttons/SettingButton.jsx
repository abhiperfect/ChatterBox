import * as React from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import SendIcon from "@mui/icons-material/Send";

export default function SettingButton() {
  return (
    <Stack direction="row">
      <Button
        variant="contained"
        sx={{ borderRadius: "50%", height: "59px", width: "59px" }}
      >
        <SendIcon sx={{ fontSize: "30px" }} />
      </Button>
    </Stack>
  );
}
