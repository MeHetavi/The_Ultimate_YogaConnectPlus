import React from 'react';
import Navbar from '../../Components/Skeleton/Navbar';
import Footer from '../../Components/Skeleton/Footer';
import { Typography, Box } from '@mui/material';
import Genere from '../../Components/Shop/Genere';
export default function Shop() {
    const genere = [
        { name: 'Wearables', link: '/shop/wearables' },
        { name: 'Essentials', link: '/shop/essentials' },
        { name: 'Accessories', link: '/shop/accessories' },
        { name: 'Storage & Maintenance', link: '/shop/storage&maintanance' },
    ]
    return (
        <>
            <Navbar />
            <Box
                sx={{
                    p: 4,
                    m: 4,
                }}
            >
                <Typography
                    variant="h3" sx={{
                        fontWeight: '300',
                        color: '#323232',
                        fontFamily: "Montserrat",
                        textAlign: 'center'
                    }}>
                    Your Yoga Journey Deserves The Best
                    <Typography
                        variant="h5" sx={{
                            fontWeight: '200',
                            color: '#323232',
                            fontFamily: "Montserrat",
                            textAlign: 'center'
                        }}>
                        Shop Our Curated Collection For Every Yogi
                    </Typography>
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    {genere.map((item) => (
                        <Genere name={item.name} link={item.link}></Genere>
                    ))}
                </Box>
            </Box>
            <Footer />
        </>
    )
}