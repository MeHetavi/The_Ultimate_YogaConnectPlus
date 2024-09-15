import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import Navbar from '../../Components/Skeleton/Navbar';
import Footer from '../../Components/Skeleton/Footer';
import { useSelector } from 'react-redux';
import { styled } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useBecomeTraineeMutation } from '../../services/api';
import { getToken } from '../../services/localStorage';
const StyledTypography = styled(Typography)(() => ({
    fontFamily: 'Montserrat',
}));

const Dashboard = () => {
    const { username } = useParams();
    const navigate = useNavigate();
    const { users } = useSelector((state) => state.allUsersData);
    const [profile, setProfile] = useState('');
    const [becomeTrainee, { isLoading, error }] = useBecomeTraineeMutation();

    useEffect(() => {
        const foundUser = users.find((user) => user.username === username);
        if (foundUser) {
            setProfile(foundUser);
        }
    }, [username, users]);

    const handleBecomeTrainee = () => {
        const access_token = getToken().access_token; // Assuming you have a method to get the token
        if (profile) {
            becomeTrainee({ access_token, user: profile.username, profile: profile })
                .unwrap()
                .then((response) => {
                    // Handle successful response
                    console.log('Trainee status:', response);
                })
                .catch((err) => {
                    // Handle error
                    console.error('Error becoming trainee:', err);
                });


        }
    };

    if (!profile) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                }}
            >
                <Typography variant="h6">Profile not found</Typography>
            </Box>
        );
    }

    return (
        <>
            <Navbar />
            <Box
                sx={{
                    display: 'flex'
                }}
            >
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
                    <StyledTypography variant="h4" component="div">
                        {profile.name}
                        <br />
                        {profile.username}
                        <br />
                        {profile.trainees}
                    </StyledTypography>

                    <StyledTypography variant="h4" component="div">
                        Trainees
                        <Button onClick={handleBecomeTrainee} variant="contained" color="primary" disabled={isLoading}>
                            {isLoading ? 'Processing...' : 'Become Trainee'}
                        </Button>
                        {error && <Typography color="error">{error.message}</Typography>}
                    </StyledTypography>
                </Box>
            </Box>
            <Footer />
        </>
    );
};

export default Dashboard;
