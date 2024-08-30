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

const Box3 = () => {
    return (
        <Box
            sx={{
                width: 'inherit',
                height: 'inherit',
                backgroundColor: '#3b7789', // Light blue background color
                borderRadius: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                marginTop: '5vh',
                display: 'flex'

            }}
        >
            <Typography variant="h3"
                sx={{
                    fontWeight: '300',
                    color: '#fff',
                    fontFamily: "Montserrat",
                    fontSize: '30px',
                    p: 2
                }}
            >
                Discover Our AI Generated Selections Tailored For Your Practice.
            </Typography>

            <Button
                variant="contained"
                sx={{
                    fontWeight: '500',
                    color: '#323232',
                    fontFamily: "Montserrat",
                    fontSize: '20px',
                    mt: 4,
                    backgroundColor: '#fff',
                    color: '#323232',
                    borderRadius: '50px',
                    textTransform: 'none',
                    padding: '8px 16px',
                    '&:hover': {
                        backgroundColor: '#f5f5f5',
                    },
                }}
            >
                Find Your Yoga Style
            </Button>
        </Box>
    );
};

export default Box3;
