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
                <Box
                    sx={{
                        width: '30vw',
                        color: '#000',
                        marginLeft: 'auto',
                        p: '1%',
                        cursor: 'context-menu'
                    }}
                >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde cupiditate nisi accusantium repudiandae accusamus asperiores, dicta vero, iste fugit ex laborum sequi? Dolore aliquid in praesentium dolores saepe aliquam placeat autem optio necessitatibus, temporibus quis. Animi inventore, assumenda accusamus dolore quam aut ut
                </Box>
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