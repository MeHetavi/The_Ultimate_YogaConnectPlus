import React, { useEffect, useState, useCallback } from 'react';
import { Box, Typography, Card, CardContent, TextField, Button, Avatar, ThemeProvider, createTheme, styled, Snackbar, Alert, Modal } from '@mui/material';
import Cropper from 'react-easy-crop';
import Navbar from '../../Components/Skeleton/Navbar';
import Grid from '@mui/material/Grid2';
import LeftNavbar from '../../Components/Skeleton/LeftNavbar';
import { useSelector } from 'react-redux';
import { useUpdateProfileMutation } from '../../services/api';
import { getToken } from '../../services/localStorage';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../features/userSlice';
import { getFullAvatarPath } from '../../services/localStorage';
import { useMediaQuery } from '@mui/material';

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
        height: 'auto', // Allow height to adjust based on content
        minHeight: '2.75rem',
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

    '& .MuiInputBase-inputMultiline': {
        padding: '0.5rem 0.75rem',
    },

    '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
    },
}));

const ErrorText = styled(Typography)({
    color: 'red',
    fontSize: '0.75rem',
    marginTop: '0.25rem',
});

const UpdateProfile = (props) => {
    const data = useSelector((state) => state.user);
    const [user, setUser] = useState({});
    const dispatch = useDispatch();
    const [editedUser, setEditedUser] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const { access_token, refresh_token } = getToken()
    const [updateUser, { isLoading: isUpdating }] = useUpdateProfileMutation();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [isCropping, setIsCropping] = useState(false);
    const [errors, setErrors] = useState({});
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    useEffect(() => {
        if (data.username !== '') {
            setUser(data);
            setEditedUser(data);
        }
    }, [data]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleAvatarChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setAvatar(URL.createObjectURL(file));
            setIsCropping(true);
        }
    };

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const createImage = (url) =>
        new Promise((resolve, reject) => {
            const image = new Image();
            image.addEventListener('load', () => resolve(image));
            image.addEventListener('error', (error) => reject(error));
            image.src = url;
        });

    const getCroppedImg = async (imageSrc, pixelCrop) => {
        const image = await createImage(imageSrc);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const maxSize = Math.max(image.width, image.height);
        const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

        canvas.width = safeArea;
        canvas.height = safeArea;

        ctx.translate(safeArea / 2, safeArea / 2);
        ctx.translate(-safeArea / 2, -safeArea / 2);

        ctx.drawImage(
            image,
            safeArea / 2 - image.width * 0.5,
            safeArea / 2 - image.height * 0.5
        );

        const data = ctx.getImageData(0, 0, safeArea, safeArea);

        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;

        ctx.putImageData(
            data,
            0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x,
            0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y
        );

        return new Promise((resolve) => {
            canvas.toBlob((file) => {
                resolve(URL.createObjectURL(file));
            }, 'image/jpeg');
        });
    };

    const handleCropSave = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(avatar, croppedAreaPixels);
            setAvatar(croppedImage);
            setIsCropping(false);
        } catch (e) {
            console.error(e);
        }
    }, [croppedAreaPixels]);

    const handleRemoveAvatar = async () => {
        try {
            const formData = new FormData();
            formData.append('avatar', null);

            const result = await updateUser({ access_token, data: formData }).unwrap();
            dispatch(setUserInfo(result));
            setUser(result);
            setEditedUser(result);
            setAvatar(null);

            setSnackbar({
                open: true,
                message: "Avatar removed successfully!",
                severity: 'success'
            });

        } catch (error) {
            console.error('Failed to remove avatar:', error);
            setSnackbar({
                open: true,
                message: "Failed to remove avatar. Please try again.",
                severity: 'error'
            });
        }
    };
    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            Object.keys(editedUser).forEach(key => {
                if (key !== 'avatar' && editedUser[key] !== user[key]) {
                    formData.append(key, editedUser[key]);
                }
            });

            if (avatar) {
                const response = await fetch(avatar);
                const blob = await response.blob();
                formData.append('avatar', blob, 'avatar.jpg');
            }

            console.log('Sending update with data:', Object.fromEntries(formData));

            const result = await updateUser({ access_token, data: formData }).unwrap();

            dispatch(setUserInfo({ ...result, trainers: data.trainers, trainees: data.trainees, is_trainer: data.is_trainer }));

            setUser(result);
            setEditedUser(result);
            setIsEditing(false);
            setAvatar(null);
            setErrors({});

            setSnackbar({
                open: true,
                message: "Profile updated successfully!",
                severity: 'success'
            });

        } catch (error) {
            console.error('Failed to update user:', error);
            console.error('Error response:', error.data);
            if (error.data && typeof error.data === 'object') {
                setErrors(error.data.errors);
                setSnackbar({
                    open: true,
                    message: "Please correct the errors in the form.",
                    severity: 'error'
                });
            } else {
                setSnackbar({
                    open: true,
                    message: `Failed to update profile: ${error.data?.detail || 'Please try again.'}`,
                    severity: 'error'
                });
            }
        }
    };

    const handleCancel = () => {
        setEditedUser(user);
        setIsEditing(false);
        setAvatar(null);
        setErrors({});
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar(prev => ({ ...prev, open: false }));
    };



    return (
        access_token ?
            <ThemeProvider theme={theme}>
                <Navbar />
                <Box sx={{ display: 'flex' }}>
                    {!isSmallScreen && <LeftNavbar />}
                    <Snackbar
                        open={snackbar.open}
                        autoHideDuration={6000}
                        onClose={handleCloseSnackbar}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}

                    >
                        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                            {snackbar.message}
                        </Alert>
                    </Snackbar>
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
                            Edit Profile
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Card sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
                                    <CardContent>
                                        <Box display="flex" alignItems="center" mb={3}>
                                            <Box mr={3}>
                                                <Avatar
                                                    src={avatar || getFullAvatarPath(editedUser.avatar)}
                                                    sx={{ width: 100, height: 100 }}
                                                />
                                            </Box>
                                            {isEditing && (
                                                <>
                                                    <Button
                                                        variant="contained"
                                                        component="label"
                                                        sx={{ height: 'fit-content', fontFamily: 'Montserrat, sans-serif', fontWeight: 600, mr: 2 }}
                                                    >
                                                        Update Avatar
                                                        <input
                                                            type="file"
                                                            hidden
                                                            accept="image/*"
                                                            onChange={handleAvatarChange}
                                                        />
                                                    </Button>
                                                    <Button
                                                        variant="outlined"
                                                        onClick={handleRemoveAvatar}
                                                        sx={{ height: 'fit-content', fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
                                                    >
                                                        Remove Avatar
                                                    </Button>
                                                </>
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
                                                    { name: 'description', label: 'Description', type: 'text', multiline: true, minRows: 2, maxRows: 10, column: 12 },
                                                ].map((field, index) => (
                                                    <Grid item xs={12} sm={field.name === 'description' ? 12 : 6} key={field.name}>
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
                                                            error={!!errors[field.name]}
                                                            multiline={field.multiline}
                                                            minRows={field.minRows}
                                                            maxRows={field.maxRows}
                                                        />
                                                        {errors[field.name] && <ErrorText>{errors[field.name]}</ErrorText>}
                                                    </Grid>
                                                ))}
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


                <Modal open={isCropping} onClose={() => setIsCropping(false)}>
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                    }}>
                        <div style={{ position: 'relative', width: '100%', height: 300 }}>
                            <Cropper
                                image={avatar}
                                crop={crop}
                                zoom={zoom}
                                aspect={1}
                                onCropChange={setCrop}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}
                                cropShape="round"
                            />
                        </div>
                        <Button onClick={handleCropSave}>Save</Button>
                    </Box>
                </Modal>
            </ThemeProvider>
            :
            <h1>404 Not Found</h1>
    );
};

export default UpdateProfile;
