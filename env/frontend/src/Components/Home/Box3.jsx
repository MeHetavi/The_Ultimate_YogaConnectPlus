import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Box3 = () => {
    const navigate = useNavigate();

    const navigateToExplore = () => {
        navigate('/Explore')
    }
    return (
        <Box
            sx={{
                width: 'inherit',
                height: 'inherit',
                backgroundColor: '#3b7789',
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
                    fontFamily: "Montserrat",
                    fontSize: '20px',
                    borderRadius: '50px',
                    textTransform: 'none',
                    padding: '8px 16px',
                    bgcolor: '#8acfe3',
                    color: '#000',
                    '&:hover': {
                        transform: 'translate(-0.25rem, -0.25rem)',
                        boxShadow: '0.25rem 0.25rem #000000'
                    },
                    '&:active': {
                        transform: 'translate(0)',
                        boxShadow: 'none'
                    }
                }}
                onClick={navigateToExplore}
            // className='btn'
            >
                Find Your Yoga Style
            </Button>
        </Box>
    );
};

export default Box3;
