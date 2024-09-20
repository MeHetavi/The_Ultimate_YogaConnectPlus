import React, { useEffect, useState } from 'react';
import Navbar from "../../Components/Skeleton/Navbar";
import { Box, Typography } from "@mui/material";
import Box1 from "../../Components/Home/Box1";
import Box2 from "../../Components/Home/Box2";
import Box3 from "../../Components/Home/Box3";
import Footer from "../../Components/Skeleton/Footer";
import Box4 from "../../Components/Home/Box4";
import { useGetLoggedUserQuery } from "../../services/api.js";
import { useDispatch } from "react-redux";
import { setUserInfo } from '../../features/userSlice.js';
import { getToken } from '../../services/localStorage.js';
import { useGetUsersQuery } from '../../services/api.js';
import { setAllUsersSlice } from '../../features/allUsersSlice.js';
import { getFullAvatarPath } from '../../services/localStorage.js';
import { motion, useScroll, useTransform } from 'framer-motion';

const AnimatedWord = ({ children, range }) => {
    const { scrollYProgress } = useScroll();
    const opacity = useTransform(scrollYProgress, range, [0, 1]);
    const y = useTransform(scrollYProgress, range, [15, 0]); // Reduced vertical movement

    return (
        <motion.span
            style={{ opacity, y, display: 'inline-block', marginRight: '0.25em' }}
        >
            {children}
        </motion.span>
    );
};

export default function Home() {
    const { access_token, refresh_token } = getToken();
    const { data } = useGetLoggedUserQuery({ access_token });
    const { data: allUsersData, isLoading, isError, error, isSuccess } = useGetUsersQuery();
    const dispatch = useDispatch();
    let usersWithFullAvatarPaths = [];
    const [trainers, setTrainers] = useState([])

    useEffect(() => {
        if (allUsersData && data) {
            // Get all the trainers of the current user
            const userTrainers = allUsersData.filter(user =>
                user.is_trainer && user.trainees && user.trainees.includes(data.username)
            ).map(trainer => trainer.username);

            setTrainers(userTrainers);

            dispatch(setUserInfo({ ...data, trainers: userTrainers }));

            // allUsersData.filter(user => user.username !== data.username) to remove current user from the suggestions list.
            const usersWithFullAvatarPaths = allUsersData.filter(user => user.username !== data.username).map(user => ({
                ...user,
                avatar: getFullAvatarPath(user.avatar)
            }));
            console.log(usersWithFullAvatarPaths)
            dispatch(setAllUsersSlice({ users: usersWithFullAvatarPaths }));
        }
    }, [allUsersData, data, dispatch])

    useEffect(() => {
        if (data && access_token) {
            dispatch(setUserInfo({
                username: data.username,
                email: data.email,
                name: data.name,
                age: data.age,
                gender: data.gender,
                is_trainer: data.is_trainer,
                followers: data.followers,
                following: data.following,
                trainees: data.trainees,
                posts: data.posts,
                avatar: data.avatar,
                trainers: data.trainers,
                description: data.description,
                items_in_cart: data.items_in_cart,
                orders: data.orders
            }))
        }
    }, [data, access_token])

    useEffect(() => {
        if (allUsersData) {

        }
    }, [allUsersData])

    console.log(data)

    const text = "At YC+, we're dedicated to enhancing your yoga practice with premium, eco-friendly products. Our mission is to offer top-quality gear and apparel that support your wellness journey while promoting sustainability.";
    const words = text.split(' ');
    const totalWords = words.length;

    // Adjust these values to control the speed of the animation
    const startScroll = 0.1;  // Start animation at 10% of scroll
    const endScroll = 0.25;    // End animation at 25% of scroll

    return (
        <>
            <Navbar />
            <Box
                sx={{
                    display: 'flex',
                    margin: '10px'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        height: '75vh',
                        width: '70vw',
                        margin: '2px'
                    }}>
                    <Box2 />
                </Box>

                <Box
                    sx={{
                        height: '75vh',
                        width: '20vw',
                        margin: '2px'

                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            height: '40vh',
                            width: '25vw',
                            margin: '2px',
                            marginLeft: '2vw'

                        }}>
                        <Box3 />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            height: '30vh',
                            width: '25vw',
                            margin: '2px',
                            marginTop: '10vh',
                            marginLeft: '2vw'
                        }}>
                        <Box1 />

                    </Box>
                </Box>
            </Box>

            {/* Page2 */}
            <Box
                sx={{
                    margin: '40px',
                    marginTop: '10vh',
                    minHeight: '100vh', // Further reduced height for faster scrolling
                }}
            >
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: '300',
                        color: '#323232',
                        fontFamily: "Montserrat",
                        width: '65vw',
                    }}
                >
                    {words.map((word, index) => (
                        <AnimatedWord
                            key={index}
                            range={[
                                startScroll + (index / totalWords) * (endScroll - startScroll),
                                startScroll + ((index + 1) / totalWords) * (endScroll - startScroll)
                            ]}
                        >
                            {word}
                        </AnimatedWord>
                    ))}
                </Typography>
            </Box >

            <Box
                sx={{
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Box
                    sx={{
                        borderRadius: '20px',
                        width: '95vw',
                        height: '190vh',
                    }}
                >
                    <Box4 />
                </Box>
            </Box>

            <Footer />
        </>
    )
}