import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Slide from '@mui/material/Slide';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import Navigation from './Navigation';
import Logo from '../Images/Logo.png'
import { getToken, storeToken } from '../../services/localStorage'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CartButton from './CartButton';
import WishlistButton from './WishlistButton';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';
import { useGetLoggedUserQuery } from '../../services/api';

function HideOnScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children ?? <div />}
        </Slide>
    );
}

HideOnScroll.propTypes = {
    children: PropTypes.element,
    window: PropTypes.func,
};


export default function Navbar(props) {

    const pages = [
        { name: 'Home', link: '/' },
        { name: 'Explore', link: '/explore' },
        { name: 'Shop', link: '/shop' }
    ];
    const settings = [
        { name: 'Dashboard', link: '/dashboard' },
    ];

    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [openAlert, setOpenAlert] = React.useState(false);
    const [progress, setProgress] = React.useState(0);

    const handleOpenNavMenu = () => {
        setDrawerOpen(true);
    };

    const handleLogOut = () => {
        // Clear the tokens from local storage or any other storage mechanism
        storeToken({ access: null, refresh: null });

        // Reset the access state
        setAccess(null);

        // Show the alert
        setOpenAlert(true);

        // Optionally, clear user state in Redux if you manage it there

        // Redirect the user to the login or home page after a short delay
        setTimeout(() => {
            window.location.href = '/gate'; // Redirect to login page
        }, 2000); // 2 seconds delay
    };

    let [access_token, setAccess] = React.useState(null);
    const user = useSelector((state) => state.user);


    useEffect(() => {
        let { access_token, refresh_token } = getToken();
        setAccess(access_token);
    }, []); // Empty dependency array to ensure it only runs once on mount

    useEffect(() => {
        if (openAlert) {
            const timer = setInterval(() => {
                setProgress((oldProgress) => {
                    if (oldProgress === 100) {
                        clearInterval(timer);
                        return 100;
                    }
                    const diff = Math.random() * 10;
                    return Math.min(oldProgress + diff, 100);
                });
            }, 200);

            return () => {
                clearInterval(timer);
            };
        }
    }, [openAlert]);

    const handleCloseNavMenu = () => {
        setDrawerOpen(false);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <HideOnScroll {...props}>
                <AppBar position="static"
                    sx={{
                        backgroundColor: 'inherit',
                        color: 'black',
                        boxShadow: 'none',  // Remove shadow
                        width: '100vw',
                    }}
                >
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            {/* Mobile Menu Icon */}
                            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                                <IconButton
                                    size="large"
                                    aria-label="open navigation menu"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenNavMenu}
                                    color="inherit"
                                >
                                    <MenuIcon />
                                </IconButton>
                            </Box>

                            {/* Logo */}
                            <Box sx={{ display: { xs: 'none', md: 'flex' }, width: '7vw' }} src={Logo} component="img"></Box>

                            {/* Centered Navigation Links */}
                            <Box
                                sx={{
                                    flexGrow: 1,
                                    display: { xs: 'none', md: 'flex' },
                                    justifySelf: 'center',
                                    justifyContent: 'center'
                                }}>

                                {pages.map((page) => (
                                    <Navigation
                                        key={page.name}  // Add this line
                                        name={page.name}
                                        link={page.link}
                                        sx={{
                                            color: 'black',
                                            display: 'block'
                                        }}
                                    />
                                ))}

                            </Box>

                            {/* User Settings Avatar */}
                            <Box sx={{
                                flexGrow: 0,
                                display: 'flex'
                            }}>
                                <WishlistButton />
                                <CartButton></CartButton>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt="User Avatar" src={user.avatar} />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {user.username ?
                                        [
                                            ...settings.map((setting) => (
                                                <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                                                    <Typography sx={{ textAlign: 'center' }}>
                                                        <Link to={setting.link}>{setting.name}</Link>
                                                    </Typography>
                                                </MenuItem>
                                            )),
                                            <MenuItem key="logout">
                                                <Typography onClick={handleLogOut} sx={{ textAlign: 'center' }}>
                                                    Log Out
                                                </Typography>
                                            </MenuItem>
                                        ]
                                        :
                                        <MenuItem onClick={handleCloseUserMenu}>
                                            <Typography sx={{ textAlign: 'center' }}>
                                                <Link to='/gate'>Log In </Link>
                                            </Typography>
                                        </MenuItem>
                                    }

                                </Menu>
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
            </HideOnScroll>

            {/* Drawer for Mobile View */}
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={handleCloseNavMenu}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: 250,
                        backgroundColor: 'background.paper',
                        color: 'black',
                        boxShadow: 'none',  // Remove shadow from drawer
                    },
                }}
            >
                {/* Drawer Logo */}
                <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} src={Logo} component="img"></Box>

                {/* Drawer Navigation Links */}
                <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    onClick={handleCloseNavMenu}
                    onKeyDown={handleCloseNavMenu}
                >
                    {pages.map((page) => (
                        <Box key={page.name} sx={{ width: '100%' }}>
                            <Navigation
                                name={page.name}
                                link={page.link}
                                sx={{ my: 2, color: 'black', display: 'block' }}
                            />
                        </Box>
                    ))}
                </Box>
            </Drawer>

            <Snackbar
                open={openAlert}
                autoHideDuration={2000}
                onClose={handleCloseAlert}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                sx={{
                    position: 'absolute',
                    top: 'auto',
                    bottom: 'auto',
                    left: 0,
                    right: 0,
                    transform: 'translateY(64px)', // Adjust this value based on your navbar height
                }}
            >
                <Alert
                    onClose={handleCloseAlert}
                    severity="error"
                    sx={{
                        width: '20vw',
                        backgroundColor: '#ffcccb', // Light red color
                        color: 'black',
                        position: 'relative', // Add this
                        paddingTop: '20px' // Add some top padding for the progress bar
                    }}
                    icon={false} // Remove the default icon
                >
                    <LinearProgress
                        variant="determinate"
                        value={progress}
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '4px', // Adjust the height as needed
                            backgroundColor: '#ff9999', // Lighter red for the background
                            '& .MuiLinearProgress-bar': {
                                backgroundColor: '#cc0000' // Darker red for the progress bar
                            }
                        }}
                    />
                    Logging out...
                </Alert>
            </Snackbar>
        </React.Fragment>
    );
}
