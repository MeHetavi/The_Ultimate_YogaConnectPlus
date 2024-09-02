import React, { useEffect } from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { LocalFireDepartment, Favorite, DirectionsRun, NightsStay } from '@mui/icons-material';
import Navbar from '../../Components/Skeleton/Navbar';
import Grid from '@mui/material/Grid2';
import Footer from '../../Components/Skeleton/Footer';
import LeftNavbar from '../../Components/Skeleton/LeftNavbar';
import { getToken } from '../../services/localStorage';
import { useSelector } from 'react-redux';
import { useGetLoggedUserQuery } from "../../services/api";
import { setUserInfo } from '../../features/userSlice';
import { useDispatch } from 'react-redux';

const MetricCard = ({ title, value, icon, color }) => (
    <Card
        sx={{
            width: 'fit-content',
            height: 'fit-content',
            backgroundColor: '#96c9d9',
            borderRadius: '20px',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflow: 'hidden',
            marginLeft: '2vw',
            marginTop: '5vh',
        }}
    >
        <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h6" component="div">
                    {title}
                </Typography>
                {icon}
            </Box>
            <Typography variant="h4" component="div" color={color}>
                {value}
            </Typography>
        </CardContent>
    </Card>
);

const DietPlanCard = ({ day, title, description, imageUrl }) => (
    <Card
        sx={{
            width: 'fit-content',
            height: 'fit-content',
            backgroundColor: '#96c9d9', // Light blue background color
            borderRadius: '20px',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflow: 'hidden',
            marginLeft: '2vw',
            marginTop: '5vh',
        }}
    >
        <CardContent>
            <Typography variant="subtitle2" color="textSecondary">
                {`Day ${day}`}
            </Typography>
            <Typography variant="h6" component="div">
                {title}
            </Typography>
            <Typography variant="body2" color="textSecondary">
                {description}
            </Typography>
            <Box mt={2}>
                <img src={imageUrl} alt={title} style={{ width: '100%', height: 'auto' }} />
            </Box>
        </CardContent>
    </Card>
);

const Dashboard = () => {

    const [token, setAccess_token] = React.useState(getToken());
    const { data, isSuccess } = useGetLoggedUserQuery({ access_token: token.access_token })
    const dispatch = useDispatch();

    useEffect(() => {
        if (data) {
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
            }))
        }
    }, [data])

    const user = useSelector((state) => state.user);

    return (
        <>
            <Navbar />

            {/* First Box (duplicated) */}
            <Box
                sx={{
                    display: 'flex'
                }}
            >
                <LeftNavbar />

                {/* Original First Box (now second) */}
                <Box
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        m: 4,
                        bgcolor: 'rgb(0,0,0,0.1)',
                        borderRadius: '30px',
                        height: 'fit-content',
                        width: '65vw'
                    }}
                >
                    <Typography variant="h4" component="div">
                        Hello, {user.name} 👋
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Let's do some workout today
                    </Typography>

                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={3}>
                            <MetricCard title="Calories" value="1428 kcal" icon={<LocalFireDepartment color="warning" />} color="warning.main" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <MetricCard title="Heart Rate" value="104 bpm/day" icon={<Favorite color="error" />} color="error.main" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <MetricCard title="Steps" value="9,886 steps" icon={<DirectionsRun color="success" />} color="success.main" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <MetricCard title="Sleep" value="8.5 hrs/day" icon={<NightsStay color="primary" />} color="primary.main" />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="h6" component="div" gutterBottom>
                                Diet Plan
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <DietPlanCard
                                        day={1}
                                        title="Fruits only"
                                        description="It contains most water content in it."
                                        imageUrl="/api/placeholder/400/320"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <DietPlanCard
                                        day={2}
                                        title="Vegetables only"
                                        description="It contains most water content in it."
                                        imageUrl="/api/placeholder/400/320"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <DietPlanCard
                                        day={3}
                                        title="Fruits and Vegetables"
                                        description="It contains most water content in it."
                                        imageUrl="/api/placeholder/400/320"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Footer />
        </>
    );
};

export default Dashboard;
