import * as React from 'react';
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
import { getToken } from '../../services/localStorage'
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

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
    const pages = ['Home', 'explore', 'Shop'];
    const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = () => {
        setDrawerOpen(true);
    };
    let [access, setAccess] = React.useState(null)

    useEffect(() => {
        let { access_token, refresh_token } = getToken()
        setAccess(access_token)
    })

    const handleCloseNavMenu = () => {
        setDrawerOpen(false);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
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
                    }}
                >
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>

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

                            <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, width: '7vw' }} src={Logo} component="img"></Box>
                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
                                {pages.map((page) => (

                                    <Navigation name={page}
                                        sx={{
                                            my: 2, color: 'black',
                                            display: 'block'
                                        }}

                                    />
                                ))}
                            </Box>
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                    </IconButton>
                                </Tooltip>
                                {access ?
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
                                        {settings.map((setting) => (
                                            <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                                <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                    :

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
                                        <MenuItem onClick={handleCloseUserMenu}>
                                            <Typography sx={{ textAlign: 'center' }}>
                                                <Link to='/gate'>Log In </Link></Typography>
                                        </MenuItem>
                                    </Menu>
                                }

                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
            </HideOnScroll>

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
                <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} src={Logo} component="img"></Box>
                <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    onClick={handleCloseNavMenu}
                    onKeyDown={handleCloseNavMenu}
                >
                    {pages.map((page) => (
                        <Box
                            sx={{
                                width: '100%',
                            }}
                        >
                            <Navigation name={page} sx={{ my: 2, color: 'black', display: 'block' }} />
                        </Box>

                    ))}
                </Box>
            </Drawer>

        </React.Fragment>
    );
}
