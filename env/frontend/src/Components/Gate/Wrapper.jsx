import { Box } from "@mui/material";
import { styled } from "@mui/material";


const Wrapper = styled(Box)(({ theme }) => ({
    '--input-focus': '#2d8cf0',//'#' '#323232' # #fff
    '--font-color': 'black',
    '--font-color-sub': '#666',
    '--bg-color': 'beige',
    '--main-color': '#323232',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
}));

export default Wrapper;
