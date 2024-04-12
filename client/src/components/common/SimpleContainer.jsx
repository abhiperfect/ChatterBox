import * as React from 'react';
import Box from '@mui/material/Box';

export default function SimpleContainer({ children, backgroundColor, height ,cursor}) {
  return (
    <React.Fragment>
      <Box sx={{ paddingLeft: 0, paddingRight: 0 }}>
        <div>
          <Box sx={{
            cursor:cursor,
            bgcolor: backgroundColor,
            height: height,
            overflow: 'auto',
            '&::-webkit-scrollbar': {
              width: '8px', // Width of the scrollbar
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#8D99AE', // Color of the thumb
              borderRadius: '4px', // Border radius of the thumb
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: '#f1f1f1', // Color of the track
            },
          }}>
            {children}
          </Box>
        </div>
      </Box>
    </React.Fragment>
  );
}
