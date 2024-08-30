import React from 'react';
import { Box, Typography } from '@mui/material';
import video from '../Images/Vid1.mp4';
import { Card, CardMedia } from '@mui/material';
import Text from './RotatingText';

const VideoCard = ({ videoSrc }) => {
    return (
        <Card sx={{ background: 'transparent', boxShadow: 'none' }}>
            <CardMedia component="video" controls loop autoPlay src={videoSrc} sx={{ width: '25vw', borderRadius: '100px' }} />
        </Card>
    );
};


const Box2 = () => {
    return (
        <Box
            sx={{
                width: 'inherit',
                height: 'inherit',
                backgroundColor: '#96c9d9', // Light blue background color
                borderRadius: '20px',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden',
                marginLeft: '2vw',
                marginTop: '5vh',
                fontFamily: ''
            }}
        >
            <Box
                sx={{
                    alignSelf: 'end',
                    margin: '20px'
                }}>
                <VideoCard
                    videoSrc={video}

                />
            </Box>

            <Box
                sx={{
                    margin: '10px',
                    textAlign: 'center',
                    width: 'fit-content'
                }}
            >
                <Typography variant="h3"
                    sx={{
                        fontWeight: '800',
                        color: '#323232',
                        fontFamily: "Montserrat",
                    }}
                >
                    <Text />
                </Typography>

                <Typography variant="h5" sx={{
                    color: '#7A7A7A',
                    fontWeight: '600',
                    fontFamily: "Montserrat"

                }}>
                    Yoga For Soul`s Relief
                </Typography>
            </Box>
        </Box>
    );
};

export default Box2;
