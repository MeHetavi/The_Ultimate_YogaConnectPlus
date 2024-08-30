import FlipCardSide from "../../Components/Gate/FlipCardSide.jsx";
import { Typography } from "@mui/material";
import FormInput from "../../Components/Gate/FormInput.jsx";
import FlipCardButton from "../../Components/Gate/FlipCardBtn.jsx";
import { storeToken } from '../../services/localStorage.js';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from '../../services/api.js'
import { Alert } from "@mui/material";

export default function SignIn() {
    const [server_error, setServerError] = useState({})

    const navigate = useNavigate();
    const [loginUser] = useLoginUserMutation()

    const handleSignInSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        let data = {
            username: formData.get('username'),
            password: formData.get('password'),
        }


        const res = await loginUser(data);

        if (res.error) {
            setServerError(res.error.data.errors)
        }

        if (res.data) {
            storeToken(res.data.token);
            navigate('/');
        }
    }

    return (
        <FlipCardSide
            sx={{
                transform: 'rotateY(0deg)',
                width: '384px',
                alignItems: 'center'
            }}
        >
            <Typography variant="h5" sx={{ fontWeight: 900, color: 'var(--main-color)' }}>
                Sign in
            </Typography>
            <form className="flip-card__form" method='post' onSubmit={handleSignInSubmit}>
                <FormInput required placeholder="Username" name="username" variant="outlined" /><br />
                <FormInput required placeholder="Password" name="password" type="password" variant="outlined" /><br />
                <FlipCardButton type="submit">Let`s go!</FlipCardButton>
                {server_error.non_field_errors ? <Alert severity='error'>{server_error.non_field_errors}</Alert> : ''}
            </form>
        </FlipCardSide>
    );
}