import React, { useEffect, useState } from 'react';
import FlipCardSide from "../../Components/Gate/FlipCardSide";
import { Typography } from "@mui/material";
import FormInput from "../../Components/Gate/FormInput";
import FlipCardButton from "../../Components/Gate/FlipCardBtn";
import { storeToken } from '../../services/localStorage.js';
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from '../../services/api.js';
import { styled } from "@mui/material";
import { Box, RadioGroup, Radio, FormControlLabel } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';

const Option = styled(Box)(({ checked }) => ({
    marginRight: '5px',
    width: '80.5px',
    height: '28px',
    position: 'relative',
    top: '2px',
    left: '2px',
    borderRadius: '34px',
    transition: '0.25s cubic-bezier(0, 0, 0, 1)',
    backgroundColor: checked ? '#000' : 'transparent',
    color: checked ? '#fff' : 'var(--font-color-dark)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
        backgroundColor: checked ? '#000' : 'var(--secondary-color)',
    },
}));

const HiddenRadio = styled(Radio)(() => ({
    display: 'none',
}));

const RadioOption = ({ label, value, selectedValue, onChange }) => (
    <Option checked={selectedValue === value}>
        <FormControlLabel
            value={value}
            control={<HiddenRadio />}
            label={<Typography>{label}</Typography>}
            onChange={onChange}
            sx={{
                width: '100%',
                margin: 0,
                justifyContent: 'center',
            }}
        />
    </Option>
);

const Wrapper = styled(Box)(({ theme }) => ({
    '--font-color-dark': '#323232',
    '--font-color-light': '#fff',
    '--bg-color': '#fff',
    '--main-color': '#323232',
    '--secondary-color': '#505050',
    position: 'relative',
    height: '36px',
    backgroundColor: 'beige',
    border: `2px solid var(--main-color)`,
    borderRadius: '34px',
    display: 'flex',
    flexDirection: 'row',
    boxShadow: `4px 4px var(--main-color)`,
}));

export default function SignUp() {
    const [server_error, setServerError] = useState([]);
    const [genderValue, setGenderValue] = useState('male');
    const [typeValue, setTypeValue] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [progress, setProgress] = useState(0);

    const alertDuration = 2000; // 2 seconds

    useEffect(() => {
        let timer;
        if (openAlert) {
            timer = setInterval(() => {
                setProgress((oldProgress) => {
                    if (oldProgress >= 100) {
                        clearInterval(timer);
                        return 100;
                    }
                    return oldProgress + (100 / (alertDuration / 100));
                });
            }, 100);
        }

        return () => {
            if (timer) {
                clearInterval(timer);
            }
        };
    }, [openAlert]);

    const navigate = useNavigate();
    const [registerUser] = useRegisterUserMutation();

    const handleSignUpSubmit = async (e) => {

        e.preventDefault();

        let data = new FormData(e.currentTarget);

        let formData = {
            username: data.get('username'),
            name: data.get('name'),
            email: data.get('email'),
            gender: data.get('gender'),
            password: data.get('password'),
            password2: data.get('password2'),
            age: data.get('age'),
            is_trainer: data.get('is_trainer')
        }
        console.log(formData)
        const res = await registerUser(formData);

        if (res.error) {
            setServerError(res.error.data.errors);
        }
        else if (res.data) {
            storeToken(res.data.token);
            setOpenAlert(true);
            // Scroll to the top of the page
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            setTimeout(() => {
                navigate('/');
            }, 2000);
        }
    };

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
        setProgress(0);
    };

    return (
        <>
            <FlipCardSide sx={{
                transform: 'rotateY(180deg)',
                width: '384px',
                alignItems: 'center',
            }}>
                <Typography variant="h5" sx={{ fontWeight: 900, color: 'var(--main-color)' }}>
                    Sign up
                </Typography>

                <form className="flip-card__form" method='post' onSubmit={handleSignUpSubmit}>
                    <FormInput required placeholder="Username" name="username" variant="outlined" />
                    <br />
                    {server_error.username ? (
                        <Typography
                            style={{ fontSize: 12, color: "red", paddingLeft: 10 }}
                        >
                            {server_error.username}
                        </Typography>
                    ) : (
                        ""
                    )}
                    <FormInput required placeholder="Name" name="name" variant="outlined" />
                    <br />


                    <FormInput required placeholder="Age" name="age" variant="outlined" type='number' />
                    <br />
                    {server_error.age ? (
                        <Typography
                            style={{ fontSize: 12, color: "red", paddingLeft: 10 }}
                        >
                            {server_error.age}
                        </Typography>
                    ) : (
                        ""
                    )}

                    <Wrapper sx={{ width: '280px', marginTop: '13px' }}>
                        <RadioGroup
                            row
                            value={genderValue}
                            onChange={(e) => setGenderValue(e.target.value)}
                            name="gender"
                        >
                            <RadioOption label='Male' value='male' selectedValue={genderValue} />
                            <RadioOption label='Female' value='female' selectedValue={genderValue} />
                            <RadioOption label='Other' value='other' selectedValue={genderValue} />
                        </RadioGroup>
                    </Wrapper>
                    <br />

                    <FormInput required placeholder="Email" name="email" variant="outlined" type='email' />
                    <br />

                    {server_error.email ? (
                        <Typography
                            style={{ fontSize: 12, color: "red", paddingLeft: 10 }}
                        >
                            {server_error.email}
                        </Typography>
                    ) : (
                        ""
                    )}

                    <FormInput required placeholder="Password" name="password" type="password" variant="outlined" />
                    <br />

                    {server_error.password ? (
                        <Typography
                            style={{ fontSize: 12, color: "red", paddingLeft: 10 }}
                        >
                            {server_error.password}
                        </Typography>
                    ) : (
                        ""
                    )}

                    <FormInput required placeholder="Confirm Password" name="password2" type="password" variant="outlined" />
                    <br />

                    {server_error.non_field_errors ? (
                        <Typography
                            style={{ fontSize: 12, color: "red", paddingLeft: 10 }}
                        >
                            {server_error.non_field_errors}
                        </Typography>
                    ) : (
                        ""
                    )}

                    <Wrapper sx={{ width: '190px', marginTop: '13px', justifyself: 'center' }}>
                        <RadioGroup
                            row
                            value={typeValue}
                            onChange={(e) => setTypeValue(!typeValue)}
                            name="is_trainer"
                        >
                            <RadioOption label='Trainer' value={true} selectedValue={typeValue} />
                            <RadioOption label='General' value={false} selectedValue={typeValue} />
                        </RadioGroup>
                    </Wrapper>
                    <br />
                    <FlipCardButton type="submit">Confirm!</FlipCardButton>
                </form>
                <Snackbar
                    open={openAlert}
                    autoHideDuration={alertDuration}
                    onClose={handleCloseAlert}
                    anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                    sx={{
                        position: 'fixed',
                        top: '64px', // Adjust based on your navbar height
                        left: '20px', // Add some left padding
                    }}
                >
                    <Alert
                        severity="success"
                        sx={{
                            width: '20vw',
                            backgroundColor: '#e8f5e9', // Light green color
                            color: 'black',
                            position: 'fixed',
                            top: "-10%",
                            left: "-110%",
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
                                backgroundColor: '#c8e6c9', // Lighter green for the background
                                '& .MuiLinearProgress-bar': {
                                    backgroundColor: '#4caf50' // Darker green for the progress bar
                                }
                            }}
                        />
                        Signing up...
                    </Alert>
                </Snackbar>
            </FlipCardSide>
        </>
    );
}
