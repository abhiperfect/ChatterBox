import React, { useState, useRef, useEffect } from "react";
import LeftContainer from "../components/chat/LeftContainer.jsx";
import RightContainer from "../components/chat/RightContainer.jsx";
import ColumnsGrid from "../components/common/ColumnsGrid.jsx";
import Grid from "@mui/material/Unstable_Grid2";
import Footer from "../components/common/Footer.jsx";
import axios from "axios";

export default function Chat() {
  const isLoading = false;
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 600); // Assuming mobile view width as 600px

  // Update isMobileView state on window resize
  const handleResize = () => {
    setIsMobileView(window.innerWidth < 600);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="mainContainer">
      <ColumnsGrid>
        {/* For mobile devices, the LeftContainer will take the full width */}
        <Grid
          item
          xs={12}
          // md={12}
          // lg={12}
          sm={4}
        >
          <LeftContainer handleMobileView={isMobileView} />
        </Grid>
        {/* For laptops and larger screens, the LeftContainer will take 1/3 of the width */}
        <Grid
          item
          xs={12}
          // md={12}
          // lg={12}
          sm={8}
          sx={{ position: isMobileView ? "absolute" : "static", bottom: "0" }}
        >
          <RightContainer handleMobileView={isMobileView} />
        </Grid>
      </ColumnsGrid>
      <Footer borderBottomRightRadius="20px" borderBottomLeftRadius="20px" />
    </div>
  );
}
