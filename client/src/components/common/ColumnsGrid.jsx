import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";

export default function ColumnsGrid({ children }) {
  return (
    <Box sx={{ flexGrow: 1  }}>
      <Grid container spacing={0} columns={12}>
        {children}
      </Grid>
    </Box>
  );
}
