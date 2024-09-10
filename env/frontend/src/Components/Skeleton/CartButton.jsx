import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function CartButton({ quantity }) {
    return (
        <Tooltip title="Cart" arrow>
            <IconButton
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '50px',
                    borderRadius: '10px',
                    backgroundColor: 'transparent',
                    position: 'relative',
                    '&:hover .icon-cart': {
                        transform: 'scale(1.2)',
                        '& path': {
                            fill: 'transparent',
                            stroke: 'black',
                            strokeWidth: 1.5,
                        },
                    },
                    '&:hover::after': {
                        visibility: 'visible',
                        opacity: 1,
                        top: '105%',
                    },
                }}
                data-quantity={quantity}
            >
                <ShoppingCartIcon
                    className="icon-cart"
                    sx={{
                        fontSize: '20px',
                        transition: '.2s linear',
                        '& path': {
                            fill: 'transparent',
                            stroke: 'black',
                            strokeWidth: 1.5,
                            transition: '.2s linear',
                        },
                    }}
                />
            </IconButton>
        </Tooltip>
    );
}
