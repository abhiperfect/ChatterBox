// Chat.jsx

import React, { useState } from "react";
import LeftContainer from "../components/chat/LeftContainer.jsx";
import RightContainer from "../components/chat/RightContainer.jsx";
import ColumnsGrid from "../components/common/ColumnsGrid.jsx";
import Grid from "@mui/material/Unstable_Grid2";

export default function Chat() {
  const [isRightContainerOpen, setIsRightContainerOpen] = useState(false);

  const handleItemClick = () => {
    setIsRightContainerOpen(true); // Toggle the state
  };

  return (
    <div className="mainContainer">
      <ColumnsGrid>
        {/* For mobile devices, the LeftContainer will take the full width */}
        <Grid item xs={12} sm={4}>
          <LeftContainer onItemClick={handleItemClick} />
        </Grid>
        {/* For laptops and larger screens, the LeftContainer will take 1/3 of the width */}
        <Grid item xs={12} sm={8}>
          <RightContainer isOpen={isRightContainerOpen}/>
        </Grid>
      </ColumnsGrid>
    </div>
  );
}
