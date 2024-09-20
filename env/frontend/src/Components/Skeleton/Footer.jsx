import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import SocialMediaIcons from './SocialMediaIcons';

export default function Footer() {
    return (
        <>
            <Container
                maxWidth="xl"
                className='container'
                sx={{
                    p: '1%',
                    marginTop: '10vh',
                    color: '#E0E4CC',
                    height: '40vh',
                }}
            >
                <Box sx={{
                    display: 'flex',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    alignItems: 'center',
                    textAlign: 'center',
                    margin: 'auto',
                    justifyContent: 'space-around',
                }}>

                    <SocialMediaIcons />
                </Box>

            </Container>
        </>
    )
}