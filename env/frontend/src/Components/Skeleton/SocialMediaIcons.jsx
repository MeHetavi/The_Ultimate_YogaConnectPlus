import React from 'react';
import { Box, IconButton, Tooltip, useTheme } from '@mui/material';
import { LinkedIn, GitHub, Instagram, YouTube } from '@mui/icons-material';

const socialMediaLinks = [
    { name: 'LinkedIn', icon: <LinkedIn />, url: 'https://linkedin.com/', color: '#0274b3' },
    { name: 'GitHub', icon: <GitHub />, url: 'https://www.github.com/', color: '#24262a' },
    {
        name: 'Instagram',
        icon: <Instagram />,
        url: 'https://www.instagram.com/',
        color: 'purple',
    },
    { name: 'YouTube', icon: <YouTube />, url: 'https://youtube.com/', color: '#ff0000' },
];

const SocialMediaIcons = () => {
    const theme = useTheme();

    return (
        <Box display="flex" justifyContent="center" alignItems="center">
            {socialMediaLinks.map((social) => (
                <Box
                    key={social.name}
                    mx={1}
                    position="relative"
                    sx={{
                        '&:hover .tooltip': {
                            opacity: 1,
                            visibility: 'visible',
                            top: '-50px',
                        },
                    }}
                >
                    <Tooltip title={social.name} placement="top" arrow classes={{ tooltip: 'tooltip' }}>
                        <IconButton
                            href={social.url}
                            aria-label={social.name}
                            sx={{
                                position: 'relative',
                                overflow: 'hidden',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: 50,
                                height: 50,
                                borderRadius: '50%',
                                color: theme.palette.grey[800],
                                background: 'transparent',
                                transition: 'all 0.3s ease-in-out',
                                '&:hover': {
                                    boxShadow: '3px 2px 45px 0px rgba(0, 0, 0, 0.12)',
                                    color: '#fff',
                                },
                                '&:hover .filled': {
                                    height: '100%',
                                },
                            }}
                        >
                            <Box
                                className="filled"
                                sx={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    width: '100%',
                                    height: 0,
                                    backgroundColor: social.color,
                                    transition: 'all 0.3s ease-in-out',
                                    zIndex: 1,
                                }}
                            />
                            <Box
                                sx={{
                                    position: 'relative',
                                    zIndex: 2,
                                }}
                            >
                                {social.icon}
                            </Box>
                        </IconButton>
                    </Tooltip>
                </Box>
            ))}
        </Box>
    );
};

export default SocialMediaIcons;
