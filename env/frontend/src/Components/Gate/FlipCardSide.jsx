import { Box } from "@mui/material";
import { styled } from "@mui/material";

const FlipCardSide = styled(Box)(({ theme }) => ({
    padding: '20px',
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    '-webkit-backface-visibility': 'hidden',
    backfaceVisibility: 'hidden',
    backgroundColor: 'lightblue',
    gap: '20px',
    borderRadius: '5px',
    border: `2px solid var(--main-color)`,
}));

export default FlipCardSide;
