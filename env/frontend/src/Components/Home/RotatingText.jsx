import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, keyframes } from '@mui/material';
import { styled } from '@mui/system';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeOut = keyframes`
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(-20px); }
`;

const AnimatedText = styled(Typography)(({ state }) => ({
    // position: 'absolute',
    left: 0,
    animation: state === 'entering'
        ? `${fadeIn} 0.5s forwards`
        : state === 'exiting'
            ? `${fadeOut} 0.5s forwards`
            : 'none',

    fontWeight: '400',
    color: '#323232',
    fontFamily: "Montserrat",
    fontSize: '50px'
}));


const RotatingText = ({ words = ['Exciting', 'Innovative', 'Powerful'], interval = 2000 }) => {
    const [index, setIndex] = useState(0);
    const [state, setState] = useState('entering');
    const wrapperRef = useRef(null);

    useEffect(() => {
        if (index < words.length - 1) {
            const rotationInterval = setInterval(() => {
                setState('exiting');

                setTimeout(() => {
                    setIndex((prevIndex) => prevIndex + 1);
                    setState('entering');
                }, 500); // Half of the animation duration
            }, interval);

            return () => clearInterval(rotationInterval);
        }
    }, [words, interval, index]);

    useEffect(() => {
        if (wrapperRef.current) {
            const maxWidth = Math.max(...words.map(word => {
                const tempSpan = document.createElement('span');
                tempSpan.style.visibility = 'hidden';
                tempSpan.style.position = 'absolute';
                tempSpan.style.fontSize = window.getComputedStyle(wrapperRef.current).fontSize;
                tempSpan.innerHTML = word;
                document.body.appendChild(tempSpan);
                const width = tempSpan.offsetWidth;
                document.body.removeChild(tempSpan);
                return width;
            }));
            wrapperRef.current.style.minWidth = `${maxWidth}px`;
        }
    }, [words]);

    return (
        <AnimatedText variant="inherit" state={state}>
            {words[index]}
        </AnimatedText>
    );
};

const InlineRotatingText = styled(Box)({
    display: 'inline-flex',
    alignItems: 'baseline',
    whiteSpace: 'nowrap',
});

const Demo = () => {
    return (
        <Box sx={{ textAlign: 'center', p: 2 }}>
            <Typography variant="h3" component="div">
                <InlineRotatingText
                    sx={{
                        fontWeight: '200',
                        color: '#323232',
                        fontFamily: "Montserrat",
                        fontSize: '30px'
                    }}
                >
                    Find <RotatingText words={['Flow', 'Calm', 'Stability', 'Balance']} interval={1000} />,
                </InlineRotatingText>
                <InlineRotatingText
                    sx={{
                        fontWeight: '200',
                        color: '#323232',
                        fontFamily: "Montserrat",
                        fontSize: '30px'
                    }}
                >
                    Find
                    <RotatingText words={['Quiet', 'Rest', 'Serenity', 'Peace']} interval={1000} />
                </InlineRotatingText>
            </Typography>
        </Box>
    );
};

export default Demo;