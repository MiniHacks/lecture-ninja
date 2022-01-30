import * as React from 'react';
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

/* splits text to have span */
let Body = function (body, onClick) {
    return body.map(t => <span onClick={() => onClick(t.timestamp)}
                               style={{display: "inline-block", margin: 2}}>{t.text}</span>);
}

/* MAKE WORDS CLICKABLE */
const Words = ({speaker, body, onClick}) => {

    return <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"start"}
        my={3}
    >
        <Typography display="inline" sx={{
            mr: 1,
            fontWeight: 'bold',
            width: 100,
            maxWidth: 100,
            minWidth: 100,
            textAlign: "left"
        }}>Speaker {"1:"} </Typography>
        <Link sx={{
            'span:hover': {
                backgroundColor: '#232323',
                color: '#c0c0c0',
                cursor: "pointer"
            },
        }} color='white' underline="none">
            {Body(body, onClick)}
        </Link>
    </Box>
}

export default Words;
