import { Box } from '@mui/material';
import Navigation from "./Navigation"

export default function LeftNavbar() {

    const navigateTo = [

        { name: 'Dashboard', link: '/dashboard' },
        { name: 'Edit', link: '/updateProfile' },
        { name: 'Progress', link: '/progress' },
        { name: 'Orders', link: '/orders' },
        { name: 'Change Password', link: '/changePassword' },
    ]

    return (
        <Box
            sx={{
                flexGrow: 1,
                p: 3,
                m: 4,
                bgcolor: 'rgb(0,0,0,0.1)',
                borderRadius: '30px',
                height: 'fit-content',
                width: '2vw'
            }}
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
    )
}