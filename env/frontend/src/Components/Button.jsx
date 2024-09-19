import React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const CustomButton = styled(Button)(({ theme }) => ({
    cursor: 'pointer',
    position: 'relative',
    padding: '3px 10px',
    fontSize: '15px',
    color: 'rgb(33, 76, 89)',
    border: '2px solid rgb(33, 76, 89)',
    fontFamily: 'Montserrat, sans-serif',
    borderRadius: '34px',
    backgroundColor: 'transparent',
    fontWeight: 400,
    transition: 'all 0.3s cubic-bezier(0.23, 1, 0.320, 1)',
    overflow: 'hidden',

    '&::before': {
        content: '""',
        position: 'absolute',
        inset: 0,
        margin: 'auto',
        width: '100%',
        height: '50px',
        borderRadius: 'inherit',
        scale: 0,
        zIndex: -1,
        backgroundColor: 'rgb(172, 214, 226)',
        transition: 'all 0.6s cubic-bezier(0.23, 1, 0.320, 1)',
    },

    '&:hover::before': {
        scale: 3,
    },

    '&:hover': {
        color: '#212121',
        transform: 'scale(1.1)',
        boxShadow: '0 0px 20px rgba(193, 163, 98, 0.4)',
    },

    '&:active': {
        transform: 'scale(1)',
    },
}));

const SubscribeButton = ({ children, ...props }) => {
    return (
        <CustomButton {...props}>
            {children}
        </CustomButton>
    );
};

export default SubscribeButton;
