import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, ThemeProvider, createTheme, styled, Snackbar, Alert, TextField } from '@mui/material';
import Navbar from '../../Components/Skeleton/Navbar';
import Grid from '@mui/material/Grid2';
import LeftNavbar from '../../Components/Skeleton/LeftNavbar';
import { useChangePasswordMutation } from '../../services/api';
import { getToken } from '../../services/localStorage';
import { useMediaQuery } from '@mui/material';
import SubscribeButton from '../../Components/Button';

// Create a theme
const theme = createTheme({
    typography: {
        fontFamily: 'Montserrat, sans-serif',
    },
});

// Custom styled TextField
const StyledTextField = styled(TextField)(({ theme }) => ({
    margin: '0.5em 0',
    width: '100%',
    maxWidth: '20rem',

    '& .MuiInputLabel-root': {
        color: theme.palette.text.primary,
        fontSize: '0.9rem',
        fontWeight: '600',
        fontFamily: 'Montserrat, sans-serif',
        transform: 'translate(14px, 10px) scale(1)',
        '&.MuiInputLabel-shrink': {
            transform: 'translate(14px, -6px) scale(0.85)',
        },
    },

    '& .MuiInputBase-root': {
        fontSize: '1rem',
        fontWeight: '400',
        fontFamily: 'Montserrat, sans-serif',
        width: '100%',
        height: '2.75rem',
        padding: '0 0.75rem',
        border: `1px solid ${theme.palette.grey[300]}`,
        borderRadius: '0.5rem',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        transition: 'all 300ms ease-in-out',
        backgroundColor: theme.palette.grey[100],

        '&:hover': {
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            borderColor: theme.palette.primary.light,
        },

        '&.Mui-focused': {
            outline: `2px solid ${theme.palette.primary.light}`,
            transform: 'translateY(-0.25rem)',
        },
    },

    '& .MuiInputBase-input': {
        padding: '0.5rem 0',
        fontWeight: '400',
        fontFamily: 'Montserrat, sans-serif',
    },

    '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
    },
}));

// Add this new styled component for error messages
const ErrorText = styled(Typography)(({ theme }) => ({
    color: theme.palette.error.main,
    fontSize: '0.75rem',
    marginTop: '3px',
    marginLeft: '14px',
}));

export default function ChangePassword() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [changePassword] = useChangePasswordMutation();
    const { access_token } = getToken();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [errors, setErrors] = useState({});
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        if (newPassword !== confirmPassword) {
            setErrors({ confirm_new_password: "New passwords don't match" });
            return;
        }

        try {
            const result = await changePassword({
                access_token,
                data: {
                    old_password: oldPassword,
                    new_password: newPassword,
                    confirm_new_password: confirmPassword
                }
            }).unwrap();

            setSnackbarMessage("Password changed successfully!");
            setSnackbarSeverity('success');
            setOpenSnackbar(true);

            // Clear the form
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            console.error('Failed to change password:', error);
            if (error.data) {
                setErrors(error.data.errors);
            }
            setSnackbarMessage("Failed to change password. Please check the errors and try again.");
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <Navbar />
            <Box sx={{ display: 'flex' }}>
                {!isSmallScreen ? <LeftNavbar /> : <></>}
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
                        Change Password
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Card sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
                                <CardContent>
                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        width: '100%',
                                        maxWidth: '40rem',
                                        margin: '0 auto'
                                    }}>
                                        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <StyledTextField
                                                        fullWidth
                                                        label="Old Password"
                                                        type="password"
                                                        value={oldPassword}
                                                        onChange={(e) => setOldPassword(e.target.value)}
                                                        required
                                                    />
                                                    {errors.old_password && <ErrorText>{errors.old_password}</ErrorText>}
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <StyledTextField
                                                        fullWidth
                                                        label="New Password"
                                                        type="password"
                                                        value={newPassword}
                                                        onChange={(e) => setNewPassword(e.target.value)}
                                                        required
                                                    />
                                                    {errors.new_password && <ErrorText>{errors.new_password}</ErrorText>}
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <StyledTextField
                                                        fullWidth
                                                        label="Confirm New Password"
                                                        type="password"
                                                        value={confirmPassword}
                                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                                        required
                                                    />
                                                    {errors.confirm_new_password && <ErrorText>{errors.confirm_new_password}</ErrorText>}
                                                </Grid>
                                            </Grid>
                                            <Box mt={2} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                                                <SubscribeButton
                                                    type="submit"
                                                >
                                                    Change Password
                                                </SubscribeButton>
                                            </Box>
                                        </form>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </ThemeProvider>
    );
}