import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import Navbar from '../../Components/Skeleton/Navbar';
import Footer from '../../Components/Skeleton/Footer';
import { getToken } from '../../services/localStorage';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { styled } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const StyledTypography = styled(Typography)(() => ({
    fontFamily: 'Montserrat',
}));

const Dashboard = () => {
    const { username } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { users } = useSelector((state) => state.allUsersData);
    const user = useSelector((state) => state.user);

    const [profile, setProfile] = useState('');

    // Use useEffect to update the profile state when the component mounts
    useEffect(() => {
        const foundUser = users.find((user) => user.username === username);
        if (foundUser) {
            setProfile(foundUser);
        }
    }, [username, users]);

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
                    </StyledTypography>

                    <StyledTypography variant="h4" component="div">
                        Trainees
                    </StyledTypography>
                </Box>
            </Box>
            <Footer />
        </>
    );
};

export default Dashboard;
