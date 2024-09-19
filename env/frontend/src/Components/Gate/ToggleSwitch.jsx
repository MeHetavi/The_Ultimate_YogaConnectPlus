import React from 'react';
import { Switch, styled } from "@mui/material";

const GateToggleSwitch = styled(Switch)(({ theme }) => ({
    width: 60,
    height: 40,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(26px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: 'var(--bg-color)',
                opacity: 1,
                border: '2px solid var(--main-color)',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 25,
        height: 25,
        border: '2px solid var(--main-color)',
        borderRadius: '5px',
        backgroundColor: 'var(--bg-color)',
    },
    '& .MuiSwitch-track': {
        borderRadius: 5,
        backgroundColor: 'var(--bg-color)',
        opacity: 1,
        border: '2px solid var(--main-color)',
        boxShadow: '4px 4px var(--main-color)',
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));

const ToggleSwitch = ({ checked, onChange }) => {
    return <GateToggleSwitch checked={checked} onChange={onChange} />;
};

export default ToggleSwitch;