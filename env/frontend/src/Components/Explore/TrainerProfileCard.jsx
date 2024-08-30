import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

// Styled card component
const Card = styled(Box)(({ theme }) => ({
    width: '190px',
    height: '120px',
    padding: '0.5rem',
    background: 'rgba(198, 198, 198, 0.34)',
    borderRadius: '8px',
    backdropFilter: 'blur(5px)',
    borderBottom: '3px solid rgba(255, 255, 255, 0.44)',
    borderLeft: '2px rgba(255, 255, 255, 0.545) outset',
    boxShadow: '-40px 50px 30px rgba(0, 0, 0, 0.28)',
    transform: 'skewX(10deg)',
    transition: '.4s',
    overflow: 'hidden',
    color: 'white',
    '&:hover': {
        height: '254px',
        transform: 'skew(0deg)',
    },
}));

// Styled dot indicator
const Dot = styled(Box)(({ color }) => ({
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: color,
    boxShadow: '-5px 5px 5px rgba(0, 0, 0, 0.28)',
}));

// Styled header text
const CardHeader = styled(Typography)(({ theme }) => ({
    textAlign: 'center',
    margin: '1.3rem',
    color: 'rgb(218, 244, 237)',
    textShadow: '-10px 5px 10px rgba(0, 0, 0, 0.573)',
}));

// Main card component
const CustomCard = () => {
    return (
        <Card>
            <Box sx={{ padding: '1rem', display: 'flex', flexDirection: 'row', gap: '5px', alignSelf: 'flex-start' }}>
                <Dot color="#ff605c" />
                <Dot color="#ffbd44" />
                <Dot color="#00ca4e" />
            </Box>
            <CardHeader variant="h6">Title</CardHeader>
        </Card>
    );
};

export default CustomCard;
