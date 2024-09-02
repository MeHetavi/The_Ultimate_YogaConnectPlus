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
            </Typography>

        </Box>
    );
};

export default Box6;
