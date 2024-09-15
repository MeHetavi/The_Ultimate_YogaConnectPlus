import React, { useState, useEffect } from 'react';
import { FormControlLabel, Box } from '@mui/material';
import GateToggleSwitch from '../../Components/Gate/ToggleSwitch.jsx';
import Container from '../../Components/Gate/Container.jsx';
import Wrapper from '../../Components/Gate/Wrapper.jsx';
import FlipCardInner from '../../Components/Gate/FlipCardInner.jsx';
import SignIn from './SignIn.jsx';
import SignUp from './SignUp.jsx';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';

const Gate = () => {
    const [isToggled, setIsToggled] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [progress, setProgress] = useState(0);
    const alertDuration = 2000; // 2 seconds

    useEffect(() => {
        let timer;
        if (openAlert) {
            const startTime = Date.now();
            const endTime = startTime + alertDuration;

            const updateProgress = () => {
                const now = Date.now();
                if (now >= endTime) {
                    setProgress(100);
                    setOpenAlert(false);
                    clearInterval(timer);
                } else {
                    const elapsed = now - startTime;
                    setProgress((elapsed / alertDuration) * 100);
                }
            };

            timer = setInterval(updateProgress, 10);
            updateProgress();
        }

        return () => {
            if (timer) {
                clearInterval(timer);
            }
        };
    }, [openAlert]);

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
        setProgress(0);
    };

    const showAlert = (message) => {
        setAlertMessage(message);
        setOpenAlert(true);
        setProgress(0);
    };

    return (
        <Wrapper>
            <Container>
                <FormControlLabel
                    control={
                        <GateToggleSwitch
                            checked={isToggled}
                            onChange={() => setIsToggled(!isToggled)}
                            color="primary"
                        />
                    }
                    label=""
                />

                <FlipCardInner
                    sx={{
                        transform: isToggled ? 'rotateY(180deg)' : 'rotateY(0deg)',
                        display: 'flex',
                        justifyContent: 'center',
                    }}>
                    <SignIn showAlert={showAlert} />
                    <SignUp showAlert={showAlert} />
                </FlipCardInner>
            </Container>

            <Snackbar
                open={openAlert}
                autoHideDuration={alertDuration}
                onClose={handleCloseAlert}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                sx={{
                    position: 'fixed',
                    top: 'calc(64px + 1px)', // Adjust '64px' to match your navbar height
                    left: '0',
                    right: '0',
                    zIndex: 1400,
                }}
            >
                <Alert
                    severity="success"
                    sx={{
                        width: '100%',
                        maxWidth: '600px',
                        margin: '0 auto',
                        backgroundColor: '#e8f5e9',
                        color: 'black',
                        position: 'relative',
                        paddingTop: '20px',
                        boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
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
                    {alertMessage}
                </Alert>
            </Snackbar>
        </Wrapper>
    );
};

export default Gate;
