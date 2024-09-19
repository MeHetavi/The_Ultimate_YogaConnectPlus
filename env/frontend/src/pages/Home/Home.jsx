import React, { useEffect, useState } from 'react';
import Navbar from "../../Components/Skeleton/Navbar";
import { Box, Typography } from "@mui/material";
import Box1 from "../../Components/Home/Box1";
import Box2 from "../../Components/Home/Box2";
import Box3 from "../../Components/Home/Box3";
import Footer from "../../Components/Skeleton/Footer";
import Box4 from "../../Components/Home/Box4";
import Box5 from '../../Components/Home/Box5';
import Box6 from '../../Components/Home/Box6';
import Box7 from '../../Components/Home/Box7';
import Box8 from '../../Components/Home/Box8';
import { useGetLoggedUserQuery } from "../../services/api.js";
import { useDispatch } from "react-redux";
import { setUserInfo } from '../../features/userSlice.js';
import { getToken } from '../../services/localStorage.js';
import { useGetUsersQuery } from '../../services/api.js';
import { useSelector } from 'react-redux';
import { setAllUsersSlice } from '../../features/allUsersSlice.js';

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
            }))
        }
    }, [data, access_token])

    useEffect(() => {
        if (allUsersData) {

        }
    }, [allUsersData])

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
                }}
            >
                <Typography
                    variant="h3" sx={{
                        fontWeight: '300',
                        color: '#323232',
                        fontFamily: "Montserrat",
                        width: '65vw',
                    }}>
                    At YC+, we`re dedicated to enhancing your yoga practice with premium, eco-friendly products. Our mission is to offer top-quality gear and apparel that support your wellness journey while promoting sustainability.
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        width: 'inherit'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            height: '40vh',
                            width: '65vw',
                            margin: '10px',
                        }}>
                        <Box5 />
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            height: '90vh',
                            width: '30vw',
                            margin: '10px',
                        }}>
                        <Box6 />
                    </Box>
                </Box>
            </Box>

            <Box
                sx={{
                    height: '70vh',
                    margin: '20px',
                    position: 'relative',
                    top: '-50vh',
                    display: 'flex'
                }}>

                <Box
                    sx={{
                        height: '41.3vh',
                        width: '39vw',
                        margin: '10px',
                        // marginLeft: '2vw'
                    }}>
                    <Box7 />
                </Box>
                <Box
                    sx={{
                        height: '41.3vh',
                        width: '25vw',
                        margin: '10px',
                    }}>
                    <Box8 />

                </Box>
            </Box>

            <Box
                sx={{
                    position: 'relative',
                    top: '-60vh',
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