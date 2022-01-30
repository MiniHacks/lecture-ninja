import * as React from 'react';
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const style = {
    
};

/* words array -> under each */
const Body = ({words}) => {

}


/* MAKE WORDS CLICKABLE */
const Words = ({speaker, words}) => {
    return <Box 
        display={"flex"}
        flexDirection={"row"}
        alignItems={"flex-start"}
        my={3}
    >
        <Typography sx={style} display="inline" sx={{ mr: 1, fontWeight: 'bold' }}> {speaker + ":"} </Typography>
        <Link color='white' underline="none" href="/dashboard">
            <Typography display="inline"> {words} </Typography>
        </Link>
    </Box>
}

export default Words;