// import { Box, Card, CardContent, Divider, Avatar, Typography } from "@mui/material";
// import { motion, AnimatePresence } from 'framer-motion';
// import { Link } from "react-router-dom";
// const ProfileCard = ({ profile }) => (
//     <motion.div
//         whileHover={{ scale: 1.05 }}

//     >
//         <Card className="profile-card"
//             sx={{
//                 boxShadow: 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset'
//             }}

//         >
//             <CardContent

//             >
//                 <Avatar
//                     alt="Remy Sharp"
//                     // src={profile_pic}
//                     sx={{
//                         display: 'block',
//                         marginRight: '40%',
//                         marginLeft: '40%',
//                     }}
//                 />
//                 <Typography gutterBottom variant="h6" component="div">
//                     {profile.username}
//                 </Typography>
//                 <Divider />
//                 {profile.name}
//                 <Typography variant="body2" color="text.secondary">
//                     {profile.description}
//                 </Typography>
//                 <Link to={`/profile/${profile.username}`} >View</Link>
//             </CardContent>
//         </Card>
//     </motion.div >
// );

// export default ProfileCard;

import React from "react";
import { Box, Typography, Avatar } from "@mui/material";
import { Link } from "react-router-dom";

const ProfileCard = ({ profile }) => {
    return (
        <Box
            sx={{
                backgroundColor: "#96c9d9",
                margin: '10px',
                width: "20vw",
                padding: "25px 20px",
                border: "4px solid #acd6e2",
                boxShadow: "0 6px 10px rgba(207, 212, 222, 1)",
                borderRadius: "10px",
                textAlign: "center",
                color: "#fff",
                fontFamily: "Poppins, sans-serif",
                transition: "all 0.3s ease",
                "&:hover": {
                    transform: "translateY(-10px)",
                },
                display: 'flex',
                justifyContent: 'center'
            }}
        >

            <Avatar
                sx={{
                    width: "5rem",
                    height: "5rem",
                    border: "4px solid #acd6e2",
                    margin: "0 auto",
                }}
            >
                <svg
                    viewBox="0 0 448 512"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    style={{ width: "2.5rem" }}
                >
                    <path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"></path>
                </svg>
            </Avatar>


            <Typography
                variant="h6"
                sx={{ marginTop: "20px", fontWeight: "600", fontSize: "18px" }}
            >
                <br />
                <Link to={`profile/${profile.username}`}>{profile.username}</Link>

            </Typography>
            <br />
            <Box
                sx={{
                    position: "relative",
                    width: "100%",
                    height: "2px",
                    margin: "20px 0",
                    backgroundColor: "#7cdacc",
                }}
            />
        </Box>
    );
};

export default ProfileCard;
