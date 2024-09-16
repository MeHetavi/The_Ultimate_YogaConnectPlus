import React from 'react';
import { Box, Typography, Link, Container } from '@mui/material';
import { styled, keyframes } from '@mui/system';

// Keyframes
const walking = keyframes`
  0% { left: 0; transform: scale(.5) rotateY(0deg); }
  49.9% { transform: scale(.5) rotateY(0deg); }
  50% { transform: scale(.5) rotateY(180deg); left: 100%; }
  100% { transform: scale(.5) rotateY(180deg); left: 0; }
`;

const walk1 = keyframes`
  0% { transform: rotate(-20deg); }
  50% { transform: rotate(20deg); }
`;

const walk2 = keyframes`
  0% { transform: rotate(20deg); }
  50% { transform: rotate(-20deg); }
`;

// Styled components
const Wrap404 = styled(Box)({
    overflow: 'hidden',
    padding: '2rem 1rem',
});

const Numbers = styled(Box)({
    padding: '2rem 0 0',
    display: 'flex',
    justifyContent: 'center',
});

const Number = styled(Box)({
    position: 'relative',
    display: 'inline-block',
    width: '150px',
    transform: 'translateX(36%) scale(0.5)',
    '@media (min-width: 768px)': {
        transform: 'translateX(60%)',
    },
});

const Four = styled(Box)({
    position: 'relative',
    width: '30px',
    height: '150px',
    border: '1px solid #000',
    '&::before, &::after': {
        content: '""',
        position: 'absolute',
        border: '1px solid #000',
    },
    '&::before': {
        top: '50%',
        right: '-1rem',
        width: '120px',
        height: '30px',
    },
    '&::after': {
        top: 0,
        left: '-60px',
        width: '30px',
        height: '120px',
    },
});

const Zero = styled(Box)({
    position: 'relative',
    width: '30px',
    height: '150px',
    border: '1px solid #000',
    '& span': {
        position: 'absolute',
        top: 0,
        left: '-60px',
        width: '30px',
        height: '150px',
        border: '1px solid #000',
    },
    '&::before, &::after': {
        content: '""',
        position: 'absolute',
        border: '1px solid #000',
    },
    '&::before': {
        top: '1rem',
        right: '-1rem',
        width: '120px',
        height: '30px',
    },
    '&::after': {
        bottom: '1rem',
        right: '-1rem',
        width: '120px',
        height: '30px',
    },
});

const TextBox = styled(Box)({
    position: 'relative',
    paddingTop: '6rem',
    textAlign: 'center',
    fontSize: '1.125em',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: '4rem',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '6rem',
        height: '1px',
        backgroundImage: 'repeating-linear-gradient(to left, rgba(0,0,0,0.35) 0, rgba(0,0,0,0.35) 0.5rem, transparent 0.5rem, transparent 1rem)',
    },
});

const SleepWalker = styled(Box)({
    position: 'relative',
    height: '1px',
    margin: '5rem 0 3rem',
    backgroundImage: 'repeating-linear-gradient(to left, transparent 0, transparent 0.12rem, rgba(0,0,0,0.15) 0.125rem, rgba(0,0,0,0.15) 0.25rem)',
    width: '50%', // Reduce to 50% of the original width
    left: '25%', // Center the shortened line
});

const Man = styled(Box)({
    position: 'absolute',
    top: '-1.4rem',
    left: 0,
    width: '1px',
    height: '2rem',
    opacity: 0.6,
    transform: 'scale(0.5)',
    animation: `${walking} 25s linear infinite`, // Reduce animation duration to match shorter distance
});

const Head = styled(Box)({
    position: 'relative',
    width: '0.5rem',
    height: '0.5rem',
    transform: 'translateX(-1px)',
    border: '1px solid #000',
    borderRadius: '50%',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: '0.28rem',
        left: 0,
        width: '170%',
        height: '1px',
        background: '#000',
        transformOrigin: '0% 0%',
        transform: 'rotate(-25deg)',
    },
});

const Torso = styled(Box)({
    position: 'relative',
    width: '1px',
    height: '50%',
    margin: '0 auto',
    background: '#000',
});

const Arm = styled(Box)({
    position: 'absolute',
    top: '10%',
    left: 0,
    width: '100%',
    height: '85%',
    transformOrigin: 'top center',
    background: '#000',
    '&::before': {
        content: '""',
        position: 'absolute',
        bottom: '-0.1rem',
        left: '0rem',
        width: '0.18rem',
        height: '0.18rem',
        border: '1px solid #000',
        borderRadius: '50%',
    },
});

const ArmA = styled(Arm)({
    transform: 'rotate(-20deg)',
    animation: `${walk1} 1.3s linear alternate infinite`,
});

const ArmB = styled(Arm)({
    transform: 'rotate(20deg)',
    animation: `${walk2} 1.3s linear alternate infinite`,
});

const Legs = styled(Box)({
    position: 'relative',
    width: '1px',
    height: '50%',
    margin: '0 auto',
});

const Leg = styled(Box)({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    transformOrigin: 'top center',
    background: '#000',
    '&::before': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '4px',
        height: '1px',
        background: '#000',
    },
});

const LegA = styled(Leg)({
    transform: 'rotate(-20deg)',
    animation: `${walk1} 1.3s linear alternate infinite`,
});

const LegB = styled(Leg)({
    transform: 'rotate(20deg)',
    animation: `${walk2} 1.3s linear alternate infinite`,
});

export default function NotFound() {
    return (
        <Container>
            <Wrap404>
                <Typography variant="body2" align="center" gutterBottom
                    sx={{
                        fontFamily: 'Bad Script, cursive',
                        fontSize: '50px',
                    }}
                >
                    Error
                </Typography>

                <Numbers>
                    <Number>
                        <Four />
                    </Number>
                    <Number>
                        <Zero>
                            <span />
                        </Zero>
                    </Number>
                    <Number>
                        <Four />
                    </Number>
                </Numbers>

                <TextBox>
                    <Typography variant="body1"
                        sx={{
                            fontFamily: 'Bad Script, cursive',
                            fontSize: '40px',
                        }}
                    >
                        Looks like you got lost... Or we're trying to confuse you...
                    </Typography>
                    <Typography variant="body1"
                        sx={{
                            fontFamily: 'Bad Script, cursive',
                            fontSize: '40px',
                        }}
                    >
                        Let us bring you <Link href="/">home</Link>.
                    </Typography>
                </TextBox>

                <SleepWalker>
                    <Man>
                        <Head />
                        <Torso>
                            <ArmA />
                            <ArmB />
                        </Torso>
                        <Legs>
                            <LegA />
                            <LegB />
                        </Legs>
                    </Man>
                </SleepWalker>
            </Wrap404>
        </Container>
    );
}