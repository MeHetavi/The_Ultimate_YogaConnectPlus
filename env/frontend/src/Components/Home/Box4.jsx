import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { keyframes } from '@mui/system';
// Keyframes for moving waves
const moveWaves = keyframes`
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 0 100%;
  }
`;

const Box4 = () => {
  return (
    <Box
      sx={{
        width: 'inherit',
        height: 'inherit',
        backgroundColor: '#D9E7FD', // Light blue background color
        borderRadius: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex'

      }}
    >

    </Box>
  );
};

export default Box4;
