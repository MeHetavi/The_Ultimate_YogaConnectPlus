import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Avatar, ThemeProvider, createTheme, Modal, IconButton, Link, Snackbar, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Navbar from '../../Components/Skeleton/Navbar';
import Grid from '@mui/material/Grid2';
import LeftNavbar from '../../Components/Skeleton/LeftNavbar';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { getToken } from '../../services/localStorage';
import { useMediaQuery } from '@mui/material';
import CustomButton from '../../Components/Button';

// Configuration
const theme = createTheme({
    typography: {
        fontFamily: 'Montserrat, sans-serif',
    },
});

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
};

const Dashboard = () => {
    const user = useSelector((state) => state.user);

    const [openTraineesModal, setOpenTraineesModal] = useState(false);
    const [openTrainersModal, setOpenTrainersModal] = useState(false);

    const handleOpenTraineesModal = () => setOpenTraineesModal(true);
    const handleCloseTraineesModal = () => setOpenTraineesModal(false);
    const handleOpenTrainersModal = () => setOpenTrainersModal(true);
    const handleCloseTrainersModal = () => setOpenTrainersModal(false);
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
    };


    return (
        <ThemeProvider theme={theme}>
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
                    <Typography variant="h4" component="div" gutterBottom sx={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, textAlign: 'start' }}>
                        Dashboard
                    </Typography>
                    <Card sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 4 }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mr: 4, minWidth: '200px' }}>
                                    <Avatar
                                        src={user.avatar}
                                        sx={{ width: 200, height: 200, mb: 2 }}
                                    />
                                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>{user.name}</Typography>
                                    <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>@{user.username}</Typography>
                                    <Box sx={{ display: 'flex', gap: 4, justifyContent: 'center' }}>
                                        <Box
                                            onClick={handleOpenTrainersModal}
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
                                            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                                                {user.trainers ? user.trainers.length : 0}
                                            </Typography>
                                            <Typography variant="body2">Trainers</Typography>
                                        </Box>
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
                                            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                                                {user.trainees ? user.trainees.length : 0}
                                            </Typography>
                                            <Typography variant="body2">Trainees</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{ flexGrow: 1 }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
                                        <Typography variant="body1">
                                            <strong>Email:</strong> {user.email}
                                        </Typography>
                                        <Typography variant="body1">
                                            <strong>Age:</strong> {user.age}
                                        </Typography>
                                        <Typography variant="body1">
                                            <strong>User Type:</strong> {user.is_trainer ? "Trainer" : "General"}
                                        </Typography>
                                    </Box>

                                    <Typography variant="body1" sx={{ mb: 3 }}>
                                        <strong>Description:</strong><br />
                                        {user.description ? user.description : "No description available"}
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>

                </Box>
            </Box>

            {/* Trainers Modal */}
            <Modal
                open={openTrainersModal}
                onClose={handleCloseTrainersModal}
                aria-labelledby="trainers-list-modal"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography id="trainers-list-modal" variant="h6" component="h2" sx={{ fontWeight: 600 }}>
                            Trainers List
                        </Typography>
                        <IconButton onClick={handleCloseTrainersModal} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    {user.trainers && user.trainers.length > 0 ? (
                        <Box sx={{ maxHeight: '300px', overflowY: 'auto' }}>
                            {user.trainers.map((trainer, index) => (
                                <Box key={index} sx={{ py: 1, borderBottom: '1px solid #e0e0e0' }}>
                                    <Link
                                        component={RouterLink}
                                        to={`/profile/${trainer}`}
                                        color="inherit"
                                        underline="hover"
                                    >
                                        {trainer}
                                    </Link>
                                </Box>
                            ))}
                        </Box>
                    ) : (
                        <Typography>No trainers found.</Typography>
                    )}
                </Box>
            </Modal>

            {/* Trainees Modal */}
            <Modal
                open={openTraineesModal}
                onClose={handleCloseTraineesModal}
                aria-labelledby="trainee-list-modal"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography id="trainee-list-modal" variant="h6" component="h2" sx={{ fontWeight: 600 }}>
                            Trainee List
                        </Typography>
                        <IconButton onClick={handleCloseTraineesModal} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    {user.trainees && user.trainees.length > 0 ? (
                        <Box sx={{ maxHeight: '300px', overflowY: 'auto' }}>
                            {user.trainees.map((trainee, index) => (
                                <Box key={index} sx={{ py: 1, borderBottom: '1px solid #e0e0e0' }}>
                                    <Link
                                        component={RouterLink}
                                        to={`/profile/${trainee}`}
                                        color="inherit"
                                        underline="hover"
                                    >
                                        {trainee}
                                    </Link>
                                </Box>
                            ))}
                        </Box>
                    ) : (
                        <Typography>No trainees found.</Typography>
                    )}
                </Box>
            </Modal>


        </ThemeProvider>
    );
};

export default Dashboard;
