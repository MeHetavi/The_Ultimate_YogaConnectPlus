import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const Box6 = () => {

    return (
        <Box
            sx={{
                width: 'inherit',
                height: 'inherit',
                backgroundColor: '#48bfe4', // Light blue background color
                borderRadius: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'end',
                justifyContent: 'end',
                position: 'relative',
                overflow: 'hidden',
                marginTop: '5vh',
                display: 'flex'

            }}
        >
            <Typography variant="h2"
                sx={{
                    fontWeight: '100',
                    color: '#000',
                    fontFamily: "Montserrat",
                    p: 2,
                    textAlign: 'end'
                }}
            >

                Guide others on their path to wellness.
                <br />
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: '400',
                        color: '#000',
                        fontFamily: "Montserrat",
                        textAlign: 'center',
                    }}
                >
                    Make your mark as a YC+ trainer.
                </Typography>
            </Typography>

            <Typography variant="h3"
                sx={{
                    fontWeight: '200',
                    color: '#000',
                    fontFamily: "Montserrat",
                    p: 2,
                    textAlign: 'center'
                }}
            >
            </Typography>
        </Box>
    );
};

export default Box6;
