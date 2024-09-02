import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const Box5 = () => {
    return (
        <Box
            sx={{
                width: 'inherit',
                height: 'inherit',
                backgroundColor: '#214c59', // Light blue background color
                borderRadius: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                marginTop: '5vh',
                padding: { xs: '20px', sm: '30px', md: '40px' }, // Responsive padding
            }}
        >
            <Typography
                variant="h3"
                sx={{
                    fontWeight: '300',
                    color: '#fff',
                    fontFamily: "Montserrat",
                    fontSize: { xs: '20px', sm: '25px', md: '30px' }, // Responsive font size
                    textAlign: 'center',
                    p: 2,
                }}
            >
                {/* Add your text here */}
                Welcome to YC+
            </Typography>

            {/* Add other elements like buttons here if needed */}
        </Box>
    );
};

export default Box5;
