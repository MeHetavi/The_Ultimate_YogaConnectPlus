import React from 'react';
import { Box } from '@mui/material';

function WavyBackground() {
    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                position: 'relative',
                zIndex: 0,
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(135deg, #121212 25%, #1a1a1a 25%, #1a1a1a 50%, #121212 50%, #121212 75%, #1a1a1a 75%, #1a1a1a)',
                    backgroundSize: '40px 40px',
                    animation: 'move 4s linear infinite',
                    zIndex: -1,
                }
            }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1440 320" preserveAspectRatio="none">
                <path fill="#121212" d="M0,128L30,133.3C60,139,120,149,180,154.7C240,160,300,160,360,138.7C420,117,480,75,540,53.3C600,32,660,32,720,58.7C780,85,840,139,900,160C960,181,1020,139,1080,133.3C1140,128,1200,160,1260,160C1320,160,1380,128,1410,112L1440,96L1440,320L0,320Z"></path>
            </svg>
        </Box>
    );
}

export default WavyBackground;
