import { TextField } from "@mui/material";
import { styled } from "@mui/material";


const FormInput = styled(TextField)(() => ({
    width: '300px',
    height: '53px',
    margin: '2%',
    borderRadius: '5px',
    border: `2px solid var(--main-color)`,
    backgroundColor: 'var(--bg-color)',
    boxShadow: `4px 4px var(--main-color)`,
    fontSize: '15px',
    fontWeight: 600,
    color: 'var(--font-color)',
    outline: 'none',
    '&::placeholder': {
        color: 'var(--font-color-sub)',
        opacity: 0.8,
    },
    '&:focus': {
        border: `2px solid var(--input-focus)`,
    },
}));

export default FormInput;
