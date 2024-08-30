import { Box } from "@mui/material";
import { styled } from "@mui/material";

const FlipCardInner = styled(Box)(({ theme }) => ({
    width: '40vw',
    height: '350px',
    position: 'relative',
    backgroundColor: 'transparent',
    perspective: '1000px',
    textAlign: 'center',
    transition: 'transform 0.8s',
    transformStyle: 'preserve-3d',
}));

export default FlipCardInner;
