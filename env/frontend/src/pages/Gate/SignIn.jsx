import React, { useEffect, useState } from 'react';
import FlipCardSide from "../../Components/Gate/FlipCardSide.jsx";
import { Typography } from "@mui/material";
import FormInput from "../../Components/Gate/FormInput.jsx";
import FlipCardButton from "../../Components/Gate/FlipCardBtn.jsx";
import { storeToken } from '../../services/localStorage.js';
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from '../../services/api.js'
import { Alert } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import LinearProgress from '@mui/material/LinearProgress';
import { Link } from 'react-router-dom';
export default function SignIn() {
    const [serverError, setServerError] = useState({});
    const navigate = useNavigate();
    const [loginUser] = useLoginUserMutation();
    const [token, setToken] = React.useState(null);
    const [openAlert, setOpenAlert] = useState(false);
    const [progress, setProgress] = useState(0);
    const autoHideDuration = 2000; // Time for the Snackbar to disappear

    useEffect(() => {
        if (openAlert) {
            // Update progress gradually to match the Snackbar duration
            const startTime = Date.now();
            const timer = setInterval(() => {
                const elapsedTime = Date.now() - startTime;
                const newProgress = Math.min((elapsedTime / autoHideDuration) * 100, 100);
                setProgress(newProgress);

                if (newProgress === 100) {
                    clearInterval(timer);
                }
            }, 50); // Update every 50ms for smooth progress

            return () => {
                clearInterval(timer);
            };
        }
    }, [openAlert]);

    const handleSignInSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        let data = {
            username: formData.get('username'),
            password: formData.get('password'),
        }

        const res = await loginUser(data);

        if (res.error) {
            setServerError(res.error.data.errors);
        }

        if (res.data) {
            storeToken(res.data.token);
            setToken(res.data.token);
            setOpenAlert(true);
            setTimeout(() => {
                navigate('/');
            }, autoHideDuration);
        }
    }

    return (
        <>
            <FlipCardSide
                sx={{
                    transform: 'rotateY(0deg)',
                    width: '384px',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h5" sx={{ fontWeight: 900, color: 'var(--main-color)' }}>
                    Sign in
                </Typography>
                <form className="flip-card__form" method='post' onSubmit={handleSignInSubmit}>
                    <FormInput required placeholder="Username" name="username" variant="outlined" /><br />
                    <FormInput required placeholder="Password" name="password" type="password" variant="outlined" /><br />
                    <FlipCardButton type="submit">Let`s go!</FlipCardButton>
                    {serverError.non_field_errors ? <Alert severity='error'>{serverError.non_field_errors}</Alert> : ''}
                </form>
                <Typography
                    sx={{
                        fontWeight: 700,
                        color: 'black',
                        textDecoration: 'none',
                    }}
                    variant="body1" ><Link to="/" sx={{ fontWeight: 700 }}>Home</Link></Typography>
            </FlipCardSide>

            <Snackbar
                open={openAlert}
                autoHideDuration={autoHideDuration}
                onClose={() => setOpenAlert(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                sx={{
                    display: 'flex',
                    position: 'fixed', // Ensure it's fixed in place
                    top: '20px',
                    left: '20px',
                }}
            >
                <Alert
                    severity="success"
                    sx={{
                        width: '20vw',
                        backgroundColor: '#e8f5e9',
                        color: 'black',
                        position: 'fixed',
                        top: "-60%",
                        left: "-70%",
                    }}
                    icon={false}
                >
                    <LinearProgress
                        variant="determinate"
                        value={progress}
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '4px',
                            backgroundColor: '#c8e6c9',
                            '& .MuiLinearProgress-bar': {
                                backgroundColor: '#4caf50'
                            }
                        }}
                    />
                    Logging in...
                </Alert>
            </Snackbar>
        </>
    );
}
