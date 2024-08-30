// VerifyOTP.js
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';

const VerifyOTP = () => {
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const history = useNavigate();
    // const location = useLocation();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'otp') setOtp(value);
        if (name === 'password') setPassword(value);
        if (name === 'confirmPassword') setConfirmPassword(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here, you would typically verify the OTP and set the password on the server
        // After verification, you can redirect to the desired page
        history.push('/welcome');
    };

    return (
        <Container maxWidth="xs">
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="100vh"
            >
                <Box
                    component={motion.div}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    p={4}
                    border={1}
                    borderColor="grey.300"
                    borderRadius={2}
                    boxShadow={3}
                    bgcolor="background.paper"
                >
                    <Typography
                        variant="h4"
                        gutterBottom
                        component={motion.h4}
                        initial={{ y: -30 }}
                        animate={{ y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        Verify OTP
                    </Typography>
                    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="otp"
                            label="OTP"
                            name="otp"
                            autoComplete="otp"
                            autoFocus
                            value={otp}
                            onChange={handleChange}
                            component={motion.div}
                            initial={{ x: -30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            label="Password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={handleChange}
                            component={motion.div}
                            initial={{ x: -30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="confirmPassword"
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            autoComplete="current-password"
                            value={confirmPassword}
                            onChange={handleChange}
                            component={motion.div}
                            initial={{ x: -30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2 }}
                            component={motion.button}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Verify & Set Password
                        </Button>
                    </form>
                </Box>
            </Box>
        </Container>
    );
};

export default VerifyOTP;
