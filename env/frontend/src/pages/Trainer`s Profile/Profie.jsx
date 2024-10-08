import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Button, Avatar, useTheme } from '@mui/material';
import Navbar from '../../Components/Skeleton/Navbar';
import Grid from '@mui/material/Grid2';
import { useSelector } from 'react-redux';
import { styled } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useBecomeTraineeMutation, useRemoveTraineeMutation } from '../../services/api';
import { getToken } from '../../services/localStorage';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../features/userSlice';
import SubscribeButton from '../../Components/Button';
import { Modal, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Link as RouterLink } from 'react-router-dom';

const StyledTypography = styled(Typography)(() => ({
    fontFamily: 'Montserrat',
}));

const Dashboard = () => {
    const { username } = useParams();
    const navigate = useNavigate();
    const { users } = useSelector((state) => state.allUsersData);
    const [profile, setProfile] = useState('');
    const [isTrainee, setIsTrainee] = useState(false);
    const [becomeTrainee, { isLoading: isBecomingTrainee }] = useBecomeTraineeMutation();
    const [removeTrainee, { isLoading: isRemovingTrainee }] = useRemoveTraineeMutation();
    const theme = useTheme();
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    let foundUser = null;
    const [openTraineesModal, setOpenTraineesModal] = useState(false);

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

        if (!isTrainee) {

            const access_token = getToken().access_token;

            if (profile) {

                becomeTrainee({ access_token, profile_username: profile.username })
                    .unwrap()
                    .then((response) => {

                        setIsTrainee(true);

                        setProfile(prevProfile => ({
                            ...prevProfile,
                            trainees: [...prevProfile.trainees, user.username]
                        }));
                        if (foundUser) {
                            foundUser.trainees = [...foundUser.trainees, user.username];
                        }
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

    const handleRemoveTrainee = () => {
        if (isTrainee) {

            const access_token = getToken().access_token;

            if (profile) {
                removeTrainee({ access_token, profile_username: profile.username })
                    .unwrap()
                    .then((response) => {

                        setIsTrainee(false);

                        setProfile(prevProfile => ({
                            ...prevProfile,
                            trainees: prevProfile.trainees.filter(trainee => trainee !== user.username)
                        }));
                        if (foundUser) {
                            foundUser.trainees = foundUser.trainees.filter(trainee => trainee !== user.username);
                        }
                        dispatch(setUserInfo({
                            ...user,
                            trainers: user.trainers.filter(trainer => trainer !== profile.username)
                        }));
                    })
                    .catch((err) => {
                        console.error('Error removing trainee:', err);
                    });
            }
        }
    };

    const handleOpenTraineesModal = () => setOpenTraineesModal(true);
    const handleCloseTraineesModal = () => setOpenTraineesModal(false);

    return (
        <>
            <Navbar />
            <Box sx={{ p: 3, maxWidth: 800, margin: '0 auto' }}>
                <Card sx={{
                    bgcolor: 'rgba(0, 0, 0, 0.1)',
                    borderRadius: '16px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(5px)',
                }}>
                    <CardContent sx={{ p: 4 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Avatar
                                src={profile.avatar}
                                sx={{ width: 200, height: 200, mb: 3 }}
                            />
                            <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>{profile.name}</Typography>
                            <Typography variant="h6" sx={{ mb: 3, color: 'text.secondary' }}>@{profile.username}</Typography>

                            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                                {profile.is_trainer && (
                                    <Box
                                        onClick={handleOpenTraineesModal}
                                        sx={{
                                            cursor: 'pointer',
                                            textAlign: 'center',
                                            p: 2,
                                            bgcolor: 'rgba(255, 255, 255, 0.1)',
                                            borderRadius: '8px',
                                            transition: 'background-color 0.3s',
                                            '&:hover': {
                                                bgcolor: 'rgba(255, 255, 255, 0.2)',
                                            }
                                        }}
                                    >
                                        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                                            {profile.trainees ? profile.trainees.length : 0}
                                        </Typography>
                                        <Typography variant="body1">Trainee</Typography>
                                    </Box>
                                )}
                            </Box>

                            <Grid container spacing={2} sx={{ mb: 3 }}>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="body1"><strong>Email:</strong> {profile.email}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="body1"><strong>Age:</strong> {profile.age}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body1"><strong>User Type:</strong> {profile.is_trainer ? "Trainer" : "General"}</Typography>
                                </Grid>
                            </Grid>

                            <Typography variant="body1" sx={{ mb: 3, textAlign: 'center' }}>{profile.description}</Typography>

                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
                                {isTrainee ? (
                                    <SubscribeButton
                                        onClick={handleRemoveTrainee}
                                        disabled={isRemovingTrainee}
                                    >
                                        {isRemovingTrainee ? 'Removing...' : 'Remove Trainer'}
                                    </SubscribeButton>
                                ) : (
                                    <SubscribeButton
                                        onClick={handleBecomeTrainee}
                                        disabled={isBecomingTrainee}
                                    >
                                        {isBecomingTrainee ? 'Becoming Trainee...' : 'Become Trainee'}
                                    </SubscribeButton>
                                )}
                                {isTrainee && profile.video_call_url && (
                                    <SubscribeButton
                                        onClick={() => window.open(profile.video_call_url, '_blank')}
                                    >
                                        Join Video Call
                                    </SubscribeButton>
                                )}
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Box>

            {/* Trainees Modal */}
            <Modal
                open={openTraineesModal}
                onClose={handleCloseTraineesModal}
                aria-labelledby="trainee-list-modal"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    borderRadius: '10px',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography id="trainee-list-modal" variant="h6" component="h2" sx={{ fontWeight: 600 }}>
                            Trainee List
                        </Typography>
                        <IconButton onClick={handleCloseTraineesModal} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    {profile.trainees && profile.trainees.length > 0 ? (
                        <Box sx={{ maxHeight: '300px', overflowY: 'auto' }}>
                            {profile.trainees.map((trainee, index) => (
                                <Box key={index} sx={{ py: 1, borderBottom: '1px solid #e0e0e0' }}>
                                    <RouterLink
                                        to={`/profile/${trainee}`}
                                        color="inherit"
                                        underline="hover"
                                    >
                                        {trainee}
                                    </RouterLink>
                                </Box>
                            ))}
                        </Box>
                    ) : (
                        <Typography>No trainees found.</Typography>
                    )}
                </Box>
            </Modal>
        </>
    );
};

export default Dashboard;