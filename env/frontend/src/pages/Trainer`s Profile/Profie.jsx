import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Button, Avatar, useTheme } from '@mui/material';
import Navbar from '../../Components/Skeleton/Navbar';
import Grid from '@mui/material/Grid2';
import { useSelector } from 'react-redux';
import { styled } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useBecomeTraineeMutation } from '../../services/api';
import { getToken } from '../../services/localStorage';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../features/userSlice';
const StyledTypography = styled(Typography)(() => ({
    fontFamily: 'Montserrat',
}));

const Dashboard = () => {
    const { username } = useParams();
    const navigate = useNavigate();
    const { users } = useSelector((state) => state.allUsersData);
    const [profile, setProfile] = useState('');
    const [is_trainee, setIsTrainee] = useState(false);
    const [becomeTrainee, { isLoading, error }] = useBecomeTraineeMutation();
    const theme = useTheme();
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    let foundUser = null;

    useEffect(() => {
        foundUser = users.find((u) => u.username === username);
        if (foundUser) {
            setProfile(foundUser);
            if (user && user.username) {
                setIsTrainee(foundUser.trainees.includes(user.username));
            }
        }
    }, [username, users, user]);

    const handleBecomeTrainee = () => {
        if (!is_trainee) {
            const access_token = getToken().access_token;
            if (profile) {
                becomeTrainee({ access_token, profile_username: profile.username })
                    .unwrap()
                    .then((response) => {
                        setIsTrainee(true);
                        // Update the profile state
                        setProfile(prevProfile => ({
                            ...prevProfile,
                            trainees: [...prevProfile.trainees, user.username]
                        }));
                        // Update the foundUser object
                        if (foundUser) {
                            foundUser.trainees = [...foundUser.trainees, user.username];
                        }
                        // Update the user state in Redux
                        dispatch(setUserInfo({
                            ...user,
                            trainers: [...user.trainers, profile.username]
                        }));
                    })
                    .catch((err) => {
                        console.error('Error becoming trainee:', err);
                    });
            }
        }
    };
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
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Card sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
                                <CardContent>
                                    <Box display="flex" alignItems="center" mb={3}>
                                        <Avatar
                                            src={profile.avatar}
                                            sx={{ width: { xs: 60, sm: 80, md: 100 }, height: { xs: 60, sm: 80, md: 100 }, mr: 3 }}
                                        />
                                        <Box>
                                            <Typography variant="h5">{profile.name}</Typography>
                                            <Typography variant="body1">@{profile.username}</Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ mt: 2 }}>
                                        <Typography variant="body1"><strong>Email:</strong> {profile.email}</Typography>
                                        <Typography variant="body1"><strong>Age:</strong> {profile.age}</Typography>
                                        <Typography variant="body1"><strong>User Type:</strong> {profile.is_trainer ? "Trainer" : "General"}</Typography>
                                        {profile.is_trainer && (
                                            <>
                                                <Typography variant="body1"><strong>Number of Trainees:</strong> {profile.trainees ? profile.trainees.length : 0}</Typography>
                                                <Button variant="contained" sx={{ mt: 2, fontFamily: 'Montserrat, sans-serif' }}>
                                                    View Trainees
                                                </Button>
                                            </>
                                        )}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                    <Typography variant="h4" component="div">
                        <Button onClick={handleBecomeTrainee} variant="contained" color="primary" disabled={isLoading}>
                            {/* {isLoading ? 'Processing...' : 'Become Trainee'} */}
                            {is_trainee ? 'Already a Trainee' : 'Become Trainee'}
                        </Button>
                        {error && <Typography color="error">{error.message}</Typography>}
                    </Typography>
                </Box>
            </Box >
        </>
    );
};

export default Dashboard;
