import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import SettingButton from "../ui/buttons/SettingButton";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function GroupThreeGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs>
          <Item
            style={{
              display: "flex",
              justifyContent: "center",
              height: "65px",
            }}
          >
            <SettingButton />
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item
            style={{
              display: "flex",
              height: "65px",
              justifyContent:'space-evenly'
            }}
          >
            <SettingButton />
            <SettingButton />
            <SettingButton />
            <SettingButton />
            <SettingButton />
          </Item>
        </Grid>
        <Grid item xs>
          <Item
            style={{
              display: "flex",
              justifyContent: "center",
              height: "65px",
            }}
          >
            <SettingButton />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
