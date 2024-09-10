import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../Components/Skeleton/Navbar';
import Footer from '../../Components/Skeleton/Footer';
import { Typography, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import ProductCard from '../../Components/Shop/ProductCard';

export default function ShopByGenere() {
    const { genere } = useParams();

    return (
        <>
            <Navbar />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100vw',
                    mt: 4,
                }}
            >
                <Typography
                    variant='h2'
                    sx={{
                        fontFamily: 'Montserrat',
                        fontWeight: 100,
                        // marginLeft: { md: '55px', xs: '0px' },
                        textAlign: 'center',
                    }}
                >
                    {genere.toUpperCase()}
                </Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100vw',
                    p: 5,
                }}
            >
                <Grid
                    container
                    spacing={3}
                    justifyContent="start"
                    sx={{ width: '100%', maxWidth: '1200px' }}
                >
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <ProductCard />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <ProductCard />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <ProductCard />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <ProductCard />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <ProductCard />
                    </Grid>
                </Grid>
            </Box>
            <Footer />
        </>
    );
}
