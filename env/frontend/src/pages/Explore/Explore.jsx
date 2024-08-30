import React, { useState, useEffect } from 'react';
import '../../Components/Styles/Explore/SearchBar.css';
import Navbar from '../../Components/Skeleton/Navbar';
import Footer from '../../Components/Skeleton/Footer';
import '../../Components/Styles/Explore/Explore.css';
import { Typography, Box, List, ListItem, Stack } from '@mui/material';
import ProfileCard from '../../Components/Explore/ProfileCard';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { setAllUsersSlice } from '../../features/allUsersSlice';
import { getToken } from '../../services/localStorage';
import { useGetUsersQuery } from '../../services/api';
import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';

const Explore = () => {
    const [profiles, setProfiles] = useState({ users: [] });
    const [searchTerm, setSearchTerm] = useState(''); // Initialize as an empty string
    const [filteredProfiles, setFilteredProfiles] = useState([]);
    const dispatch = useDispatch();
    const { access_token } = getToken();
    const { data, isSuccess } = useGetUsersQuery(access_token);

    // Store User Friends in Local State
    useEffect(() => {
        if (data && profiles.users !== data) {
            setProfiles({ users: data });
            setFilteredProfiles(data);
        }
    }, [data, profiles.users]);

    // Store User Friends in Redux Store
    useEffect(() => {
        if (data && isSuccess) {
            dispatch(setAllUsersSlice({ users: data }));
        }
    }, [data, isSuccess, dispatch]);

    // Filter profiles based on search term
    useEffect(() => {
        if (searchTerm) {
            const resultsByUsername = profiles.users.filter(profile =>
                profile.username.toLowerCase().includes(searchTerm.toLowerCase())
            );
            const resultsByName = profiles.users.filter(profile =>
                profile.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredProfiles([...new Set([...resultsByUsername, ...resultsByName])]);
        } else {
            setFilteredProfiles([]);
        }
    }, [searchTerm, profiles.users]);

    return (
        <>
            <Navbar />

            <div className="search-bar-wrapper" style={{ marginTop: '5vh' }}>
                <div className="input__container">
                    <div className="shadow__input"></div>
                    <button className="input__button__shadow">
                        <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" height="20px" width="20px">
                            <path d="M4 9a5 5 0 1110 0A5 5 0 014 9zm5-7a7 7 0 104.2 12.6.999.999 0 00.093.107l3 3a1 1 0 001.414-1.414l-3-3a.999.999 0 00-.107-.093A7 7 0 009 2z" fill-rule="evenodd" fill="#17202A"></path>
                        </svg>
                    </button>
                    <input
                        type="text"
                        name="text"
                        className="input__search"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} // Change from onClick to onChange
                    />
                </div>
            </div>

            {filteredProfiles.length > 0 && searchTerm && (
                <Box sx={{ marginTop: '2vh', textAlign: 'left' }}>
                    <List sx={{ width: '70vw', margin: '0 auto' }}>
                        {filteredProfiles.map((profile, index) => (
                            <ListItem
                                key={index}
                                sx={{ background: '#f0f0f0', margin: '5px 0', padding: '10px', borderRadius: '10px' }}
                            >
                                <Avatar
                                    sx={{
                                        width: "2rem",
                                        height: "2rem",
                                        border: "1px solid #acd6e2",
                                        display: 'relative',
                                        top: '-10px'
                                    }}
                                >
                                    <svg
                                        viewBox="0 0 448 512"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        style={{ width: "1rem" }}
                                    >
                                        <path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"></path>
                                    </svg>
                                </Avatar>
                                <Stack spacing={0.5}>
                                    <Typography
                                        sx={{
                                            fontWeight: '500',
                                            color: '#323232',
                                            fontFamily: "Montserrat",
                                            fontSize: '15px',
                                        }}
                                    >
                                        <Link to={`profile/${profile.username}`}>{profile.username}</Link>
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontWeight: '300',
                                            color: '#323232',
                                            fontFamily: "Montserrat",
                                            fontSize: '12px',
                                        }}
                                    >
                                        {profile.name}
                                    </Typography>
                                </Stack>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            )}

            <motion.div
                initial={{ y: '-20px', opacity: 0 }}
                animate={{ y: '0px', opacity: 1 }}
                transition={{ duration: 4, type: 'spring', stiffness: 120 }}
                sx={{ marginTop: '100px' }}
            >
                <Typography
                    sx={{
                        fontWeight: '350',
                        color: '#323232',
                        fontFamily: "Montserrat",
                        textAlign: 'center',
                        fontSize: '35px',
                        marginTop: filteredProfiles.length > 0 ? '5vh' : '10vh' // Adjust margin based on search results
                    }}
                >
                    Top Trainers
                </Typography>
            </motion.div>

            <motion.div
                initial={{ x: '100vw' }}
                animate={{ x: 0 }}
                transition={{ duration: 1.5, type: "tween", stiffness: 120 }}
            >
                <Box className="scroll-container">
                    {profiles.users && profiles.users.map((profile, index) => (
                        <ProfileCard key={index} profile={profile} />
                    ))}
                </Box>
            </motion.div>

            <Footer />
        </>
    );
};

export default Explore;
