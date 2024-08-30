import * as React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const CustomButton = styled(Button)(({ theme }) => ({
    margin: '10px',
    position: 'relative',
    padding: '12px 20px',  // Reduce padding if needed
    transition: 'all 0.2s ease',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    overflow: 'hidden',
    // Ensure text is on top of the animation
    '& span': {
        position: 'relative',
        zIndex: 1,

        fontWeight: '400',
        fontFamily: "Montserrat",
        letterSpacing: '0.05em',
        color: 'black',
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        display: 'block',
        borderRadius: '50px',
        background: '#b1dae7',
        width: '45px',
        height: '45px',
        transition: 'all 0.3s ease',
        zIndex: 0, // Ensure the pseudo-element is behind the text
    },
    '&:hover:before': {
        width: '100%',
        background: '#b1dae7',
    },
    '&:active': {
        transform: 'scale(0.95)',
    },
    '& svg': {
        position: 'relative',
        top: 0,
        marginLeft: '8px',  // Adjust margin if needed
        fill: 'none',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        stroke: '#234567',
        strokeWidth: '2',
        transform: 'translateX(-5px)',
        transition: 'all 0.3s ease',
    },
    '&:hover svg': {
        transform: 'translateX(0)',
    },
}));

export default function Navigation(props) {
    return (
        <CustomButton>
            {
                props.name.toLowerCase() == 'home' ?
                    <span>
                        <Link to={`/`}
                            style={{
                                textDecoration: 'none'
                            }}
                        >{props.name}
                        </Link>
                    </span>
                    :
                    <span>
                        <Link to={`/${props.name.toLowerCase()}`}
                            style={{
                                textDecoration: 'none'
                            }}
                        >{props.name}
                        </Link>
                    </span>
            }

        </CustomButton>
    );
}
