import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
const Box7 = () => {

    return (
        <Box
            sx={{
                width: 'inherit',
                height: 'inherit',
                backgroundColor: '#2a758c', // Light blue background color
                borderRadius: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                marginTop: '5vh',
                display: 'flex',
                p: 2

            }}
        >

            <Typography variant="h4"
                sx={{
                    fontWeight: '100',
                    color: '#fff',
                    fontFamily: "Montserrat",
                }}
            >
                "Find the perfect plan to elevate your training journey."
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: '300',
                        color: '#000',
                        fontFamily: "Montserrat",
                        textAlign: 'start',
                    }}
                >
                    Join YC+ today
                </Typography>
            </Typography>


        </Box>
    );
};

export default Box7;
