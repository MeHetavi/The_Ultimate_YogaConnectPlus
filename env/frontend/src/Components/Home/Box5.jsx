import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import Yoga1 from '../Images/Home2.jpg';
import '../Styles/Home/Box4.css';

const Box5 = () => {
    return (
        <Box
            sx={{
                width: 'inherit',
                height: 'inherit',
                backgroundColor: '#214c59', // Light blue background color
                borderRadius: '20px',
                display: 'flex',
                // flexDirection: 'column',
                // alignItems: 'center',
                // position: 'relative',
                marginTop: '5vh',
                padding: { xs: '20px', sm: '30px', md: '40px' }, // Responsive padding
            }}
        >
            <Box
                sx={{
                    textAlign: 'start'
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: '300',
                        color: '#fff',
                        fontFamily: "Montserrat",
                        textAlign: 'start',
                        width: '70%'
                    }}
                >
                    Find your zen in every pose with gear that's as dedicated as you are.
                </Typography>
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: '300',
                        color: '#fff',
                        fontFamily: "Montserrat",
                        textAlign: 'start',
                    }}
                >
                    Shop YC+ today
                </Typography>
            </Box>
            <Box>
                <img src={Yoga1} alt="" className='revealing-image'
                    style={{
                        width: '20vw',
                        height: 'fit-content',
                        borderRadius: '30px',
                    }}
                />
            </Box>
        </Box>
    );
};

export default Box5;
