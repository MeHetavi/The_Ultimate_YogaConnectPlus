import React from 'react';
import { Box, Typography } from '@mui/material';
import { Card, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const VideoCard = ({ videoSrc }) => {
    return (
        <Card sx={{ background: 'transparent', boxShadow: 'none' }}>
            <CardMedia component="video" controls loop autoPlay src={videoSrc} sx={{ width: '25vw', borderRadius: '100px' }} />
        </Card>
    );
};


const Genere = (props) => {
    const navigateTo = useNavigate()
    const navigate = () => {
        navigateTo(props.link)
    }
    return (
        <Box
            sx={{
                width: '180px',
                height: '180px',
                backgroundColor: '#214c59', // Light blue background color
                borderRadius: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden',
                m: 6,
            }}
            onClick={navigate}
        >
            <Typography
                sx={{
                    fontWeight: '500',
                    color: '#385761',
                    fontFamily: "Montserrat",
                    fontSize: '20px',
                    zIndex: '10',
                    color: 'white',
                    p: 2,
                    textAlign: 'center'
                }}
            >
                {props.name}
            </Typography>
        </Box>
    );
};

export default Genere;
