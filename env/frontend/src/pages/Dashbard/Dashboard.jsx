import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Button, Avatar, ThemeProvider, createTheme, CircularProgress, Modal, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Navbar from '../../Components/Skeleton/Navbar';
import Grid from '@mui/material/Grid2';
import LeftNavbar from '../../Components/Skeleton/LeftNavbar';
import { useSelector } from 'react-redux';
import { useGetLoggedUserQuery } from '../../services/api';
import { getToken } from '../../services/localStorage';

// Configuration
const API_BASE_URL = '';  // Adjust this to match your backend URL

const theme = createTheme({
    typography: {
        fontFamily: 'Montserrat, sans-serif',
    },
});


const Settings = () => {
    const { access_token, refresh_token } = getToken();
    const user = useSelector((state) => state.user);
    const [isLoading, setIsLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    return (
        <ThemeProvider theme={theme}>
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
                    <Typography variant="h4" component="div" gutterBottom sx={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}>
                        User Profile
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Card sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
                                <CardContent>
                                    <Box display="flex" alignItems="center" mb={3}>
                                        <Avatar
                                            src={user.avatar}
                                            sx={{ width: 100, height: 100, mr: 3 }}
                                        />
                                        <Box>
                                            <Typography variant="h5" sx={{ fontWeight: 600 }}>{user.name}</Typography>
                                            <Typography variant="body1">@{user.username}</Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ mt: 2 }}>
                                        <Typography variant="body1"><strong>Email:</strong> {user.email}</Typography>
                                        <Typography variant="body1"><strong>Age:</strong> {user.age}</Typography>
                                        <Typography variant="body1"><strong>User Type:</strong> {user.is_trainer ? "Trainer" : "General"}</Typography>
                                        {user.is_trainer && (
                                            <>
                                                <Typography variant="body1"><strong>Number of Trainees:</strong> {user.trainees ? user.trainees.length : 0}</Typography>
                                                <Button variant="contained" onClick={handleOpenModal} sx={{ mt: 2, fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
                                                    View Trainees
                                                </Button>
                                            </>
                                        )}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
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
                        <IconButton onClick={handleCloseModal} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    {user.trainees && user.trainees.length > 0 ? (
                        <Box sx={{ maxHeight: '300px', overflowY: 'auto' }}>
                            {user.trainees.map((trainee, index) => (
                                <Typography key={index} sx={{ py: 1, borderBottom: '1px solid #e0e0e0' }}>
                                    {trainee}
                                </Typography>
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

export default Settings;
