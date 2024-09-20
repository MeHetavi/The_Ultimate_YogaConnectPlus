import React from 'react'
import LeftNavbar from '../../Components/Skeleton/LeftNavbar';
import Navbar from '../../Components/Skeleton/Navbar';
import { Box, Typography, createTheme } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import Grid from '@mui/material/Grid2';

const theme = createTheme({
    typography: {
        fontFamily: 'Montserrat, sans-serif',
    },
});

export default function Orders() {
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    const user = useSelector((state) => state.user);
    const orders = user.orders;
    return (
        <>
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
                    {orders.map((item) => (
                        <Grid container spacing={2} sx={{ marginTop: '20px' }}>
                            <Grid item xs={4}>
                                <img src={item.image} alt={item.name} style={{ width: '100%', height: 'auto' }} />
                            </Grid>
                            <Grid item xs={8}>
                                <Typography sx={{ fontWeight: 'bold', fontFamily: 'montserrat' }} variant="h6">{item.name}</Typography>
                                <Typography sx={{ fontFamily: 'montserrat' }} variant="body2" color="text.secondary">{item.description}</Typography>
                                <Typography sx={{ fontFamily: 'montserrat' }} variant="body1">Rs. {item.price}</Typography>
                            </Grid>
                            <Box
                                sx={{
                                    position: "relative",
                                    width: "100%",
                                    height: "1px",
                                    margin: "15px 0",
                                    backgroundColor: "#000",
                                }}
                            />
                        </Grid>
                    ))}
                </Box>
            </Box>
        </>
    )
}