import React from 'react'
import LeftNavbar from '../../Components/Skeleton/LeftNavbar';
import Navbar from '../../Components/Skeleton/Navbar';
import { Box } from '@mui/material';

export default function Orders() {
    return (
        <div>
            <Navbar />
            <Box sx={{ display: 'flex' }}>
                <LeftNavbar />
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

                </Box>
            </Box>
            <h1>Orders</h1>
        </div>
    )
}