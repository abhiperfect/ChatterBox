import * as React from "react";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Chip from "@mui/material/Chip";

export default function MyAvatar({ backgroundColor }) {
  return (
    <Chip
      sx={{
        width: "125px",
        height: "50px",
        fontSize: "1.2rem",
        borderRadius: "30px",
        backgroundColor: { backgroundColor },
      }} // Adjust width, height, and font size as needed
      avatar={
        <Avatar
          alt="Dremy Sharp"
          src="/static/images/avatar/2.jpg"
          sx={{ width: "100px", height: "100px" }} // Increase width and height
          style={{ height: "40px", width: "40px" }}
        />
      }
      label={
        <React.Fragment>
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", fontSize: "18px" }}
          >
            Avatar
          </Typography>{" "}
          {/* New term */}
          <Typography
            variant="body2"
            sx={{ fontSize: "12px", color: '#4CCD99', animation: "blinking 2s infinite" }} // Apply animation
          >
            online
          </Typography>
          {/* Existing label */}
        </React.Fragment>
      }
    />
  );
}
