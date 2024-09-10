import React from 'react';
import { Box, Typography } from '@mui/material';
import Yoga1 from '../Images/Home1.jpg';
import '../Styles/Home/Box4.css';

const Box4 = () => {

  return (
    <Box
      sx={{
        width: 'inherit',
        height: 'inherit',
        backgroundColor: '#acd6e2', // Light blue background color
        borderRadius: '20px',
        display: 'flex',
        // flexDirection: 'column',
        // alignItems: 'center',
        justifyContent: 'space-between',
        // position: 'relative',
      }}
    >

      <Box>
        <Typography
          variant="h2"
          sx={{
            fontWeight: '200',
            fontFamily: "Montserrat",
            p: 5,
          }}
        >
          Connect Deeper,
          <  br />
          Practice Stronger,
          <  br />
          Live Better With YC+
        </Typography>
      </Box>

      <img src={Yoga1} alt="" className='revealing-image'
        style={{
          width: '30vw',
          height: 'fit-content',
          borderRadius: '30px',
          justifySelf: 'end',
          margin: 20,
        }}
      />
    </Box>
  );
};

export default Box4;
