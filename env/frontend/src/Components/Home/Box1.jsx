import React from 'react';
import { Box, Typography } from '@mui/material';
import '../Styles/Home/Box1.css'

const WaveCard = () => {
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
                display: 'flex'

            }}
        >
            <Typography
                variant="h3"
                sx={{
                    fontWeight: '250',
                    color: '#385761',
                    fontFamily: "Montserrat",
                    fontSize: '20px',
                    zIndex: '10',
                    color: 'white',
                    p: 2,
                    textAlign: 'end'
                }}
            >
                Discover premium yoga gear, apparel, and accessories designed for every level.
            </Typography>

            <a style={{ '--clr': '#000' }} className="button" href="/shop">
                <span className="button__icon-wrapper">
                    <svg width="10" className="button__icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 15">
                        <path fill="currentColor" d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"></path>
                    </svg>
                    <svg className="button__icon-svg button__icon-svg--copy" xmlns="http://www.w3.org/2000/svg" width="10" fill="none" viewBox="0 0 14 15">
                        <path fill="currentColor" d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"></path>
                    </svg>
                </span>
                Browse Collection
            </a>
        </Box>
    );
};

export default WaveCard;
