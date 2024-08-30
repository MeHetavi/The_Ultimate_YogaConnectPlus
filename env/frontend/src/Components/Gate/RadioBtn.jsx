import React from 'react';
import { Box, Radio, Typography, RadioGroup, FormControlLabel } from '@mui/material';
import { styled } from '@mui/system';


const Option = styled(Box)(({ theme, checked }) => ({
    marginRight: '5px',
    width: '80.5px',
    height: '28px',
    position: 'relative',
    top: '2px',
    left: '2px',
    borderRadius: '34px',
    transition: '0.25s cubic-bezier(0, 0, 0, 1)',
    backgroundColor: checked ? '#000' : 'transparent', // Highlight selected option with black
    color: checked ? '#fff' : 'var(--font-color-dark)', // Change text color when selected
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
        backgroundColor: checked ? '#000' : 'var(--secondary-color)',
    },
}));

const HiddenRadio = styled(Radio)(() => ({
    display: 'none',
}));

const RadioOption = ({ label, value, selectedValue, onChange }) => (
    <Option checked={selectedValue === value}>
        <FormControlLabel
            value={value}
            control={<HiddenRadio />}
            label={<Typography>{label}</Typography>}
            onChange={onChange}
            sx={{
                width: '100%',
                margin: 0,
                justifyContent: 'center',
            }}
        />
    </Option>
);

const RadioBtn = (props) => {
    const [selectedValue, setSelectedValue] = React.useState('option1');
    // const items = props
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const Wrapper = styled(Box)(({ theme }) => ({
        '--font-color-dark': '#323232',
        '--font-color-light': '#fff',
        '--bg-color': '#fff',
        '--main-color': '#323232',
        '--secondary-color': '#505050',
        position: 'relative',
        width: props.wid,
        height: '36px',
        backgroundColor: 'beige',
        border: `2px solid var(--main-color)`,
        borderRadius: '34px',
        display: 'flex',
        flexDirection: 'row',
        boxShadow: `4px 4px var(--main-color)`,
    }));

    return (
        <Wrapper>
            <RadioGroup row value={selectedValue} onChange={handleChange}>
                {props.items.map((item, index) => (
                    <RadioOption label={item} value={item} name={item} selectedValue={selectedValue} />
                ))}
            </RadioGroup>
        </Wrapper>
    );
};

export default RadioBtn;
