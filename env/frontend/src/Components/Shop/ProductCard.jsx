import React, { useState } from 'react';
import { Checkbox, Card, CardContent, CardMedia, Typography, SvgIcon, styled, Divider, Button, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch } from 'react-redux';
import { useAddToCartMutation } from '../../services/api';
import { getToken } from '../../services/localStorage';
import { setUserInfo } from '../../features/userSlice';
import { useSelector } from 'react-redux';

const HeartContainer = styled(Box)({
    position: 'relative',
    width: '50px',
    height: '50px',
    transition: '0.3s',
});

const SvgContainer = styled(Box)({
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
});

const SvgIconStyled = styled(SvgIcon)(({ theme, filled, celebrate }) => ({
    fill: 'red',
    position: 'absolute',
    ...(filled && {
        animation: 'keyframesSvgFilled 1s',
        display: 'block',
    }),
    ...(celebrate && {
        animation: 'keyframesSvgCelebrate 0.5s',
        animationFillMode: 'forwards',
        display: 'block',
        stroke: 'rgb(255, 91, 137)',
        strokeWidth: '2px',
    }),
}));

const HeartButton = () => {
    const [isChecked, setIsChecked] = useState(false);

    const handleToggle = () => {
        setIsChecked(!isChecked);
    };

    return (
        <HeartContainer title={!isChecked ? 'Add to wishlist' : 'Remove from Wishlist'}>
            <style>{`
        @keyframes keyframesSvgFilled {
          0% { transform: scale(0); }
          25% { transform: scale(1.2); }
          50% { transform: scale(1); filter: brightness(1.5); }
        }
        @keyframes keyframesSvgCelebrate {
          0% { transform: scale(0); }
          50% { opacity: 1; filter: brightness(1.5); }
          100% { transform: scale(1.4); opacity: 0; display: none; }
        }
      `}</style>
            <Checkbox
                checked={isChecked}
                onChange={handleToggle}
                sx={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    opacity: 0,
                    zIndex: 20,
                    cursor: 'pointer',
                }}
            />
            <SvgContainer>
                <SvgIconStyled viewBox="0 0 24 24">
                    <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z" />
                </SvgIconStyled>
                {isChecked && (
                    <>
                        <SvgIconStyled filled viewBox="0 0 24 24">
                            <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z" />
                        </SvgIconStyled>
                        <SvgIconStyled celebrate viewBox="0 0 100 100">
                            <polygon points="10,10 20,20" />
                            <polygon points="10,50 20,50" />
                            <polygon points="20,80 30,70" />
                            <polygon points="90,10 80,20" />
                            <polygon points="90,50 80,50" />
                            <polygon points="80,80 70,70" />
                        </SvgIconStyled>
                    </>
                )}
            </SvgContainer>
        </HeartContainer>
    );
};

const CartButton = styled(Button)(({ theme }) => ({
    width: '140px',
    height: '40px',
    borderRadius: '12px',
    border: 'none',
    backgroundColor: 'rgb(33, 76, 89)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transitionDuration: '0.5s',
    overflow: 'hidden',
    boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.103)',
    position: 'relative',
    '&:hover .iconContainer': {
        transform: 'translateX(58px)',
        borderRadius: '40px',
        transitionDuration: '0.5s',
    },
    '&:hover .text': {
        transform: 'translate(10px, 0)',
        transitionDuration: '0.5s',
    },
    '&:active': {
        transform: 'scale(0.95)',
        transitionDuration: '0.5s',
    },
}));

const IconContainer = styled(Box)(({ theme }) => ({
    position: 'absolute',
    left: '-50px',
    width: '30px',
    height: '30px',
    backgroundColor: 'transparent',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    zIndex: 2,
    transitionDuration: '0.5s',
}));

const CartIcon = styled(SvgIcon)({
    fill: 'rgb(172, 214, 226)',
});

const CartText = styled(Typography)({
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgb(226,226,226)',
    zIndex: 1,
    transitionDuration: '0.5s',
    fontWeight: '800',
    fontFamily: "Montserrat",
    fontSize: '10px'
});


const AddToCartButton = ({ product }) => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [addToCartMutation] = useAddToCartMutation();
    const { access_token } = getToken();
    const [addToCart, setAddToCart] = useState(
        user.items_in_cart.map((item) => item.id).includes(product.id)
    );
    const handleAddToCart = async () => {
        try {
            const result = await addToCartMutation({ product_id: product.id, quantity: 1, access_token });
            dispatch(setUserInfo(
                {
                    ...user,
                    items_in_cart: [...user.items_in_cart, product]
                }
            ));
            setAddToCart(true);
        } catch (error) {
            console.error('Failed to add item to cart:', error);
        }
    };

    return (
        addToCart ?
            <CartButton disabled={true} className="CartBtn" sx={{ backgroundColor: 'grey' }}>
                <IconContainer className="iconContainer">
                    <CartIcon component={ShoppingCartIcon} className="icon" />
                </IconContainer>
                <CartText className="text"> Added to Cart </CartText>
            </CartButton>
            :
            <CartButton onClick={handleAddToCart} className="CartBtn">
                <IconContainer className="iconContainer">
                    <CartIcon component={ShoppingCartIcon} className="icon" />
                </IconContainer>
                <CartText className="text"> Add to Cart</CartText>
            </CartButton>


    );
};

const ProductCard = ({ product }) => {
    return (
        <Card
            sx={{
                width: 230,
                height: 300,
                backgroundColor: '#fff',
                border: '2px solid #323232',
                boxShadow: '4px 4px #323232',
                borderRadius: '5px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '10px',
                margin: '20px',
                gap: '10px',
            }}
        >
            <CardMedia
                component="div"
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    height: 100,
                    backgroundColor: 'rgb(33, 76, 89)',
                    borderRadius: '5px',
                    border: '2px solid black',
                    transition: 'all 0.5s',
                    '&:hover': {
                        transform: 'translateY(-3px)',
                    },
                }}
            >
                <Box sx={{ display: { xs: 'none', md: 'flex' }, width: '5vw' }} src={product.image} component="img"></Box>
            </CardMedia>

            <CardContent sx={{ padding: '0px' }}>
                <Typography
                    variant="h6"
                    component="div"
                    align="center"
                    sx={{
                        color: '#323232',
                        fontWeight: '400',
                        fontFamily: "Montserrat",
                    }}
                >
                    {product.name}
                </Typography>


                <Divider
                    sx={{
                        marginY: '10px',
                        borderColor: '#323232',
                        borderRadius: '50px',
                    }}
                />
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="h6"
                        sx={{
                            color: '#323232',
                            fontWeight: '400',
                            fontFamily: "Montserrat",
                        }}>
                        <span style={{ color: '#666' }}>Rs</span> {product.price}
                    </Typography>
                    <HeartButton />
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <AddToCartButton product={product} />
                </Box>

            </CardContent>
        </Card>
    );
};

export default ProductCard;
