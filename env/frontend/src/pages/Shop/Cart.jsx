import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Card, CardContent, Typography, Divider, IconButton, Alert, Snackbar } from '@mui/material';
import Grid from '@mui/material/Grid2';
import DeleteIcon from '@mui/icons-material/Delete';
import Navbar from '../../Components/Skeleton/Navbar';
import SubscribeButton from '../../Components/Button';
import { useRemoveFromCartMutation } from '../../services/api';
import { getToken } from '../../services/localStorage';
import { setUserInfo } from '../../features/userSlice';
import { usePlaceOrderMutation } from '../../services/api';

const CartItem = ({ item, onRemove }) => (
    <Card sx={{ mb: 2, backgroundColor: 'rgb(0,0,0,0.1)', borderRadius: '10px', fontFamily: 'montserrat' }} >
        <CardContent>
            <Grid container spacing={2} alignItems="flex-start">
                <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'end', width: '100%' }}>
                    <IconButton onClick={() => onRemove(item.id)} aria-label="delete" sx={{ p: 0 }}>
                        <DeleteIcon />
                    </IconButton>
                </Grid>
                <Grid item xs={4}>
                    <img src={item.image} alt={item.name} style={{ width: '100%', height: 'auto' }} />
                </Grid>
                <Grid item xs={7}>
                    <Typography sx={{ fontWeight: 'bold', fontFamily: 'montserrat' }} variant="h6">{item.name}</Typography>
                    <Typography sx={{ fontFamily: 'montserrat' }} variant="body2" color="text.secondary">{item.description}</Typography>
                    <Typography sx={{ fontFamily: 'montserrat' }} variant="body1">Rs. {item.price}</Typography>
                </Grid>
            </Grid>
        </CardContent>
    </Card >
);

const Bill = ({ items }) => {
    let total = 0
    items.map((item) => total = total + parseInt(item.price));
    return (
        <Box sx={{ mt: 4 }}>
            <Divider sx={{ mb: 2 }} />
            <Typography sx={{ fontFamily: 'montserrat' }} variant="h5" gutterBottom>Bill Summary</Typography>
            {items.map((item, index) => (
                <Typography key={index} sx={{ fontFamily: 'montserrat' }} variant="body1">
                    {item.name} : Rs. {item.price}
                </Typography>
            ))}
            <Divider sx={{ my: 2 }} />
            <Typography sx={{ fontFamily: 'montserrat' }} variant="h6">Total: Rs. {total}</Typography>
        </Box>
    );
};

export default function Cart() {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [cartItems, setCartItems] = useState(user.items_in_cart)
    const [removeFromCartMutation] = useRemoveFromCartMutation();
    const [placeOrderMutation] = usePlaceOrderMutation();
    const [openAlert, setOpenAlert] = useState(false);

    const handleRemoveItem = async (productId) => {
        const { access_token } = getToken();
        await removeFromCartMutation({ product_id: productId, access_token });
        const updatedCartItems = cartItems.filter(item => item.id !== productId);
        setCartItems(updatedCartItems);
        dispatch(setUserInfo({ ...user, items_in_cart: updatedCartItems }));
    };

    const handlePlaceOrder = async () => {
        const { access_token, refresh_token } = getToken();
        await placeOrderMutation({ access_token, items: cartItems });
        cartItems.forEach((item) => {
            removeFromCartMutation({ product_id: item.id, access_token });
        });

        setOpenAlert(true);
        setTimeout(() => {
            setCartItems([]);
            dispatch(setUserInfo({ ...user, items_in_cart: [], orders: [...user.orders, ...cartItems] }));
        }, 3000);
    }

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };

    return (
        <>
            <Navbar />
            <Box sx={{ p: 3 }}>
                <Typography sx={{ textAlign: 'center', fontFamily: 'montserrat', fontWeight: 'bold', fontSize: '2rem', mt: 4 }} variant="h4" gutterBottom>Your Cart</Typography>
                {cartItems.length === 0 ? (
                    <Typography sx={{ fontFamily: 'montserrat', fontSize: '2rem', mt: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'grey', fontWeight: '200', height: '40vh' }}>Your cart is empty.</Typography>
                ) : (
                    <>
                        {cartItems.map((item) => (
                            <CartItem key={item.id} item={item} onRemove={handleRemoveItem} />
                        ))}
                        <Bill items={cartItems} />
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                            <SubscribeButton onClick={handlePlaceOrder} sx={{ width: '40%', fontSize: '1.2rem' }} >Place Order</SubscribeButton>
                        </Box>
                    </>
                )}
            </Box>
            <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
                    Order placed successfully!
                </Alert>
            </Snackbar>
        </>
    );
}