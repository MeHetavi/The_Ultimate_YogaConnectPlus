import { Box, LinearProgress, Avatar, List, ListItem, ListItemText } from '@mui/material';
import Navigation from "./Navigation"
export default function LeftNavbar() {

    const navigateTo = ['Dashboard', 'Progress', 'Subscribe', 'Logout']

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
                <Navigation name={page}
                    sx={{
                        my: 2, color: 'black',
                        display: 'block'
                    }}
                />
            ))}
        </Box>
    )
}