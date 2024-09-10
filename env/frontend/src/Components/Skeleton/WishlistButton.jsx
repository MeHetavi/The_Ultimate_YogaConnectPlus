import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function WishlistButton({ liked }) {
    return (
        <Tooltip title='Wishlist' arrow>
            <IconButton
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '50px',
                    borderRadius: '10px',
                    backgroundColor: 'transparent',
                    position: 'relative',
                    '&:hover .icon-like': {
                        transform: 'scale(1.2)',
                        '& path': {
                            fill: 'black',
                        },
                    },
                    '&:hover::after': {
                        visibility: 'visible',
                        opacity: 1,
                        top: '105%',
                    },
                }}
            >
                {liked ? (
                    <FavoriteIcon
                        className="icon-like"
                        sx={{
                            width: '24.38px',
                            height: '30.52px',
                            transition: '.2s linear',
                            '& path': {
                                fill: 'black',
                                transition: '.2s linear',
                            },
                        }}
                    />
                ) : (
                    <FavoriteBorderIcon
                        className="icon-like"
                        sx={{
                            fontSize: '20px',
                            transition: '.2s linear',
                            '& path': {
                                fill: 'black',
                                transition: '.2s linear',
                            },
                        }}
                    />
                )}
            </IconButton>
        </Tooltip>
    );
}
