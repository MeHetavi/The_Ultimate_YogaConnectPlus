import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../Components/Skeleton/Navbar';
import Footer from '../../Components/Skeleton/Footer';
import { Typography, Box, CircularProgress, Container } from '@mui/material';
import Grid from '@mui/material/Grid2';
import ProductCard from '../../Components/Shop/ProductCard';
import { useGetProductsByCategoryQuery } from '../../services/api';

export default function ShopByGenere() {
    const { genere } = useParams();
    const { data, isLoading, error } = useGetProductsByCategoryQuery(genere);

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography variant="h6" color="error">Error: {error.message}</Typography>
            </Box>
        );
    }

    // Check if data exists and has the expected structure
    const products = data?.find(category => category.name.toLowerCase() === genere.toLowerCase())?.products || [];

    return (
        <>
            <Navbar />
            <Container maxWidth="xl" sx={{ py: 4 }}>
                <Typography
                    variant='h2'
                    sx={{
                        fontFamily: 'Montserrat',
                        fontWeight: 100,
                        textAlign: 'center',
                        mb: 4,
                    }}
                >
                    {genere.toUpperCase()}
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={product.id}>
                                <ProductCard product={product} />
                            </Grid>
                        ))
                    ) : (
                        <Grid item xs={12}>
                            <Typography variant="h6" textAlign="center">No products found in this category.</Typography>
                        </Grid>
                    )}
                </Grid>
            </Container>
            <Footer />
        </>
    );
}
