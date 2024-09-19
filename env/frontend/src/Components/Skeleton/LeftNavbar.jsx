import { Box, createTheme } from '@mui/material';
import Navigation from "./Navigation"
import { useSelector } from "react-redux"
import Navbar from './Navbar';
import { useMediaQuery } from '@mui/material';

const theme = createTheme({
    typography: {
        fontFamily: 'Montserrat, sans-serif',
    },
});

export default function LeftNavbar() {
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    const navigateTo = [

        { name: 'Dashboard', link: '/dashboard' },
        { name: 'Edit', link: '/updateProfile' },
        { name: 'Progress', link: '/progress' },
        { name: 'Orders', link: '/orders' },
        { name: 'Change Password', link: '/changePassword' },
    ]
    const user = useSelector((state) => state.user)

    user.is_trainer && navigateTo.push({ name: 'Video Call', link: '/videoCall' })
    const style = isSmallScreen ? {
        p: 3,
        m: 4,
        bgcolor: 'rgb(0,0,0,0.1)',
        borderRadius: '30px',
        height: 'fit-content',
        width: '80%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'start',
    } :
        {
            flexGrow: 1,
            p: 3,
            m: 4,
            bgcolor: 'rgb(0,0,0,0.1)',
            borderRadius: '30px',
            height: 'fit-content',
            width: '2vw',

        }
    return (
        <>
            {isSmallScreen ? <Navbar /> : <></>}

            <Box
                sx={style}
            >

                {navigateTo.map((page) => (
                    <Navigation name={page.name} link={page.link}
                        sx={{
                            my: 2, color: 'black',
                            display: 'block'
                        }}
                    />
                ))}
            </Box>
        </>
    )
}