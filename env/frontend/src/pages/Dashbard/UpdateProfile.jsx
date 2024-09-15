import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, TextField, Button, Avatar, ThemeProvider, createTheme, styled, Snackbar, Alert } from '@mui/material';
import Navbar from '../../Components/Skeleton/Navbar';
import Grid from '@mui/material/Grid2';
import LeftNavbar from '../../Components/Skeleton/LeftNavbar';
import { useSelector } from 'react-redux';
import { useUpdateProfileMutation } from '../../services/api';
import { getToken } from '../../services/localStorage';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../features/userSlice';

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
        fontWeight: '600', // Increased from 400 to 600
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

const UpdateProfile = (props) => {
    const data = useSelector((state) => state.user);
    const [user, setUser] = useState({});
    const dispatch = useDispatch();
    const [editedUser, setEditedUser] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [avatar, setAvatar] = useState(null);
    const { access_token, refresh_token } = getToken()
    const [updateUser, { isLoading: isUpdating }] = useUpdateProfileMutation();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [passwordUpdateError, setPasswordUpdateError] = useState('');
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    useEffect(() => {
        if (data.username !== '') {
            setUser(data);
            setEditedUser(data);
        }
    }, [data]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser(prev => ({ ...prev, [name]: value }));
    };

    const handlePasswordChange = (e) => {
        setNewPassword(e.target.value);
        setPasswordError('');
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setPasswordError('');
    };

    const handleAvatarChange = (e) => {
        setAvatar(e.target.files[0]);
    };

    const handleUpdate = async () => {
        if (newPassword && newPassword !== confirmPassword) {
            setPasswordError("Passwords don't match");
            return;
        }

        try {
            const formData = new FormData();
            Object.keys(editedUser).forEach(key => formData.append(key, editedUser[key]));

            const isAttemptingPasswordChange = newPassword && oldPassword;
            if (isAttemptingPasswordChange) {
                formData.append('new_password', newPassword);
                formData.append('old_password', oldPassword);
            }

            if (avatar) {
                formData.append('avatar', avatar);
            }

            const result = await updateUser({ access_token, data: formData }).unwrap();

            // Update Redux store with the new user info
            dispatch(setUserInfo(result));

            setUser(result);
            setEditedUser(result);
            setIsEditing(false);
            setNewPassword('');
            setConfirmPassword('');
            setOldPassword('');
            setAvatar(null);

            if (isAttemptingPasswordChange && !result.password_updated) {
                setSnackbarMessage("Profile updated, but password change failed. Old password may be incorrect.");
                setSnackbarSeverity('warning');
                setPasswordUpdateError("Old password is incorrect. Password not updated.");
            } else {
                setSnackbarMessage("Profile updated successfully!");
                setSnackbarSeverity('success');
                setPasswordUpdateError('');
            }

            setOpenSnackbar(true);

            // Automatically close the snackbar after 6 seconds
            setTimeout(() => {
                setOpenSnackbar(false);
            }, 6000);

        } catch (error) {
            console.error('Failed to update user:', error);
            setSnackbarMessage("Failed to update profile. Please try again.");
            setSnackbarSeverity('error');
            setOpenSnackbar(true);

            // Automatically close the snackbar after 6 seconds
            setTimeout(() => {
                setOpenSnackbar(false);
            }, 6000);
        }
    };

    const handleOldPasswordChange = (e) => {
        setOldPassword(e.target.value);
        setPasswordUpdateError(''); // Clear the error when user starts typing
    };

    const handleCancel = () => {
        setEditedUser(user);
        setIsEditing(false);
        setNewPassword('');
        setConfirmPassword('');
        setPasswordError('');
        setOldPassword('');
        setAvatar(null);
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        access_token ?
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
                            Update Profile
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Card sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
                                    <CardContent>
                                        <Box display="flex" alignItems="center" mb={3}>
                                            <Box mr={3}>
                                                <Avatar
                                                    src={editedUser.avatar}
                                                    sx={{ width: 100, height: 100 }}
                                                />
                                            </Box>
                                            {isEditing && (
                                                <Button
                                                    variant="contained"
                                                    component="label"
                                                    sx={{ height: 'fit-content', fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
                                                >
                                                    Update Avatar
                                                    <input
                                                        type="file"
                                                        hidden
                                                        accept="image/*"
                                                        onChange={handleAvatarChange}
                                                    />
                                                </Button>
                                            )}
                                        </Box>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            width: '100%',
                                            maxWidth: '40rem',
                                            margin: '0 auto'
                                        }}>
                                            <Grid container spacing={2}>
                                                {[
                                                    { name: 'username', label: 'Username', type: 'text' },
                                                    { name: 'name', label: 'Name', type: 'text' },
                                                    { name: 'age', label: 'Age', type: 'number' },
                                                    { name: 'email', label: 'Email', type: 'email' },
                                                ].map((field, index) => (
                                                    <Grid item xs={12} sm={6} key={field.name}>
                                                        <StyledTextField
                                                            fullWidth
                                                            label={field.label}
                                                            name={field.name}
                                                            type={field.type}
                                                            value={editedUser[field.name] || ''}
                                                            onChange={handleInputChange}
                                                            disabled={!isEditing}
                                                            margin="normal"
                                                            placeholder={`Enter ${field.label.toLowerCase()}`}
                                                        />
                                                    </Grid>
                                                ))}
                                                {isEditing && (
                                                    <>
                                                        <Grid item xs={12} sm={6}>
                                                            <StyledTextField
                                                                fullWidth
                                                                label="Old Password"
                                                                type="password"
                                                                value={oldPassword}
                                                                onChange={handleOldPasswordChange}
                                                                margin="normal"
                                                                placeholder="Enter old password"
                                                                error={!!passwordUpdateError}
                                                                helperText={passwordUpdateError}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <StyledTextField
                                                                fullWidth
                                                                label="New Password"
                                                                type="password"
                                                                value={newPassword}
                                                                onChange={handlePasswordChange}
                                                                margin="normal"
                                                                placeholder="Enter new password"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <StyledTextField
                                                                fullWidth
                                                                label="Confirm New Password"
                                                                type="password"
                                                                value={confirmPassword}
                                                                onChange={handleConfirmPasswordChange}
                                                                margin="normal"
                                                                error={!!passwordError}
                                                                helperText={passwordError}
                                                                placeholder="Confirm new password"
                                                            />
                                                        </Grid>
                                                    </>
                                                )}
                                            </Grid>
                                        </Box>
                                        <Box mt={2} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                                            {isEditing ? (
                                                <>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={handleUpdate}
                                                        disabled={isUpdating}
                                                        sx={{ mr: 1, fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
                                                    >
                                                        {isUpdating ? 'Updating...' : 'Update'}
                                                    </Button>
                                                    <Button
                                                        variant="outlined"
                                                        onClick={handleCancel}
                                                        disabled={isUpdating}
                                                        sx={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
                                                    >
                                                        Cancel
                                                    </Button>
                                                </>
                                            ) : (
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => setIsEditing(true)}
                                                    sx={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
                                                >
                                                    Edit
                                                </Button>
                                            )}
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
            :
            <h1>404 Not Found</h1>
    );
};

export default UpdateProfile;
