import { Switch } from "@mui/material";
import { styled } from "@mui/material";

const GateToggleSwitch = styled(Switch)(({ theme, isFlipped }) => ({
    boxSizing: 'border-box',
    borderRadius: '5px',
    border: `2px solid var(--main-color)`,
    boxShadow: `4px 4px var(--main-color)`,
    // position: 'absolute',
    cursor: 'none',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'var(--bg-color)',
    // transform: 'translateY(-200px)',
    transition: '0.3s',
    '&:before': {
        boxSizing: 'border-box',
        position: 'absolute',
        content: '""',
        height: '20px',
        width: '20px',
        border: `2px solid var(--main-color)`,
        borderRadius: '5px',
        left: isFlipped ? '30px' : '-2px', // Adjusted position based on the toggle state
        bottom: '2px',
        backgroundColor: 'var(--bg-color)',
        boxShadow: `0 3px 0 var(--main-color)`,
        transition: '0.3s',
    },
}));

export default GateToggleSwitch;