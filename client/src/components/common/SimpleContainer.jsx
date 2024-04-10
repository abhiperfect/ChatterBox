import * as React from 'react';
import Box from '@mui/material/Box';


export default function SimpleContainer({children,backgroundColor, height}) {
  return (
    <React.Fragment>
      <Box sx={{ paddingLeft: 0, paddingRight: 0 }}>
      <div >
        <Box sx={{bgcolor: backgroundColor, height: height, overflow:'auto'}} >
        {children}
        </Box>
      </div>
      </Box>
    </React.Fragment>
  );
}

