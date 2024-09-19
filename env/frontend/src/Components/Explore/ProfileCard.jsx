import React from "react";
import { Box, Typography, Avatar, useTheme, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";

const ProfileCard = ({ profile }) => {
    const theme = useTheme();
    const isXsScreen = useMediaQuery(theme.breakpoints.only('xs'));
    const isSmScreen = useMediaQuery(theme.breakpoints.only('sm'));

    return (
        <Box
            sx={{
                backgroundColor: "#96c9d9",
                margin: { xs: '5px', sm: '8px', md: '10px' },
                width: { xs: '90%', sm: '85%', md: '80%' },
                maxWidth: '300px',
                padding: { xs: '15px', sm: '20px', md: '25px' },
                border: "4px solid #acd6e2",
                boxShadow: "0 6px 10px rgba(207, 212, 222, 1)",
                borderRadius: "10px",
                textAlign: "center",
                color: "#fff",
                fontFamily: "Poppins, sans-serif",
                transition: "all 0.3s ease",
                "&:hover": {
                    transform: "translateY(-10px)",
                },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto', // Center the card horizontally
            }}
        >
            <Avatar
                sx={{
                    width: { xs: '4rem', sm: '4.5rem', md: '5rem' },
                    height: { xs: '4rem', sm: '4.5rem', md: '5rem' },
                    border: "4px solid #acd6e2",
                    marginBottom: '10px',
                }}
                src={profile.avatar}
            >
                <svg
                    viewBox="0 0 448 512"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    style={{ width: "2.5rem" }}
                >
                    <path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"></path>
                </svg>
            </Avatar>

            <Typography
                variant="h6"
                sx={{
                    marginTop: '10px',
                    fontWeight: "600",
                    fontSize: { xs: '16px', sm: '17px', md: '18px' },
                    wordBreak: 'break-word',
                }}
            >
                <Link
                    to={`profile/${profile.username}`}
                    style={{ color: '#fff', textDecoration: 'none' }}
                >
                    {profile.username}
                </Link>
            </Typography>

            <Box
                sx={{
                    position: "relative",
                    width: "100%",
                    height: "2px",
                    margin: "15px 0",
                    backgroundColor: "#7cdacc",
                }}
            />

            {!isXsScreen && (
                <Typography
                    variant="body2"
                    sx={{
                        fontSize: { xs: '12px', sm: '13px', md: '14px' },
                        color: '#f0f0f0',
                        mt: '10px',
                    }}
                >
                    {profile.description ? (
                        isSmScreen ? profile.description.slice(0, 50) + '...' : profile.description
                    ) : 'No description available'}
                </Typography>
            )}
        </Box>
    );
};

export default ProfileCard;
