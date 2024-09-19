import React, { useState } from 'react'
import LeftNavbar from '../../Components/Skeleton/LeftNavbar';
import Navbar from '../../Components/Skeleton/Navbar';
import { Box, Typography, TextField, styled, createTheme } from '@mui/material';
import SubscribeButton from '../../Components/Button';
import { getToken } from '../../services/localStorage';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../features/userSlice';
import { useSaveVideoCallURLMutation, useUnsaveVideoCallURLMutation } from '../../services/api';
import { useSelector } from 'react-redux';
import { useMediaQuery } from '@mui/material';
const theme = createTheme({
    typography: {
        fontFamily: 'Montserrat, sans-serif',
    },
});

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

export default function VideoCall() {
    const { access_token, refresh_token } = getToken();
    const [callStarted, setCallStarted] = useState(false);
    const [url, setUrl] = useState('');
    const dispatch = useDispatch();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [saveURL] = useSaveVideoCallURLMutation();
    const [removeURL] = useUnsaveVideoCallURLMutation();
    const user = useSelector(state => state.user);
    const handleStartVideoCall = () => {
        window.open('http://127.0.0.1:8000/api/videoCall/', access_token);
        setCallStarted(true);
    };

    const handleSaveURL = async () => {
        if (url) {
            try {
                await saveURL({ url, access_token });
                dispatch(setUserInfo({
                    ...user,
                    videoCallURL: url
                }));
            } catch (error) {
                console.error('Error saving URL:', error);
                // Optionally, show an error message to the user
            }
        } else {
            console.error('URL is empty');
            // Optionally, show an error message to the user
        }
    };

    const handleFinishVideoCall = async () => {
        try {
            await removeURL({ access_token });
            dispatch(setUserInfo({
                ...user,
                videoCallURL: null
            }));
            setCallStarted(false);
            setUrl('');
        } catch (error) {
            console.error('Error removing URL:', error);
            // Optionally, show an error message to the user
        }
    };

    return (<>
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
                <Typography variant="h4" component="div" gutterBottom sx={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}>
                    Video Call
                </Typography>


                {callStarted ? (
                    <>
                        <Box>
                            <StyledTextField
                                fullWidth
                                label='Url'
                                name='url'
                                id='url'
                                placeholder={`Enter url`}
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                            />
                        </Box>
                        <SubscribeButton
                            onClick={handleSaveURL}
                            sx={{ mt: 2, mr: 2 }}
                        >
                            Save
                        </SubscribeButton>
                        <SubscribeButton
                            onClick={handleFinishVideoCall}
                            sx={{ mt: 2 }}
                        >
                            Finish
                        </SubscribeButton>
                    </>
                ) : (
                    <SubscribeButton
                        onClick={handleStartVideoCall}
                        sx={{ mt: 2 }}
                    >
                        Start Video Call
                    </SubscribeButton>
                )}
            </Box>
        </Box>
    </>
    )
}