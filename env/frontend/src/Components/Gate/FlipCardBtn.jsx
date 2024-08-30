import { Button } from "@mui/material";
import { styled } from "@mui/material";

const FlipCardButton = styled(Button)(({ theme }) => ({
    margin: '20px 0',
    width: '120px',
    height: '40px',
    borderRadius: '5px',
    border: `2px solid var(--main-color)`,
    backgroundColor: 'var(--bg-color)',
    boxShadow: `4px 4px var(--main-color)`,
    fontSize: '17px',
    fontWeight: 600,
    color: 'var(--font-color)',
    cursor: 'pointer',
    '&:active': {
        boxShadow: '0px 0px var(--main-color)',
        transform: 'translate(3px, 3px)',
    },
}));

export default FlipCardButton;
