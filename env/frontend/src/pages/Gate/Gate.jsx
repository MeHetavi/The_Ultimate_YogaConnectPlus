import React from 'react';
import { FormControlLabel } from '@mui/material';
import GateToggleSwitch from '../../Components/Gate/ToggleSwitch.jsx';
import Container from '../../Components/Gate/Container.jsx';
import Wrapper from '../../Components/Gate/Wrapper.jsx';
import FlipCardInner from '../../Components/Gate/FlipCardInner.jsx';
import SignIn from './SignIn.jsx';
import SignUp from './SignUp.jsx';

const Gate = () => {
    const [isToggled, setIsToggled] = React.useState(false);

    return (
        <Wrapper >
            <Container >
                <FormControlLabel
                    control={
                        <>
                            <GateToggleSwitch
                                checked={isToggled}
                                onChange={() => setIsToggled(!isToggled)}
                                color="primary"
                            />
                        </>
                    }
                    label=""

                />

                <FlipCardInner
                    sx={{
                        transform: isToggled ? 'rotateY(180deg)' : 'rotateY(0deg)',

                        display: 'flex',
                        justifyContent: 'center',
                    }}>
                    <SignIn />
                    <SignUp />
                </FlipCardInner>
            </Container>

            {/* <Link
                    className='link'
                    sx={{ fontFamily: { Inter100 } }}
                    to='/'>Home</Link> */}
        </Wrapper>
    );
};

export default Gate;
