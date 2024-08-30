import { Box } from "@mui/material";
import { styled } from "@mui/material";

const Container = styled(Box)(({ theme }) => ({
    transform: 'translateY(-200px)',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '30px',
    width: '50px',
    height: '30vh',
}));

export default Container;