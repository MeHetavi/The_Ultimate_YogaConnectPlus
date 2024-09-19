import React from 'react'
import LeftNavbar from '../../Components/Skeleton/LeftNavbar';
import Navbar from '../../Components/Skeleton/Navbar';
import { Box, Typography, createTheme } from '@mui/material';
import { useMediaQuery } from '@mui/material';

const theme = createTheme({
    typography: {
        fontFamily: 'Montserrat, sans-serif',
    },
});

export default function Orders() {
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <div>
            <Navbar />
            <Box sx={{ display: 'flex' }}>
                {!isSmallScreen && <LeftNavbar />}
                <Box
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        m: 4,
                        bgcolor: 'rgb(0,0,0,0.1)',
                        borderRadius: '30px',
                        height: 'fit-content',
                        width: '65vw'
                    }}
                >
                    <Typography variant="h4" component="div" gutterBottom sx={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}>
                        Orders
                    </Typography>
                </Box>
            </Box>
        </div>
    )
}