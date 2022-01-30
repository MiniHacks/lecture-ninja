import * as React from 'react';
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

/* splits text to have span */
let Body = function(body) {
    var text = String(body);
    text = text.split(" ").map((item, i) => <span key={i} style={{display: "inline-block", padding: 2}}>{item}</span>);

    return text;
}


/* MAKE WORDS CLICKABLE */
const Words = ({speaker, body}) => {
    
    return <Box 
        display={"flex"}
        flexDirection={"row"}
        alignItems={"flex-start"}
        my={3}
    >
        <Typography display="inline" sx={{ mr: 1, fontWeight: 'bold' }}> {speaker + ":"} </Typography>
        <Link sx={{
            'span:hover': {
                backgroundColor: '#232323',
                color: '#c0c0c0'
              },
        }} color='white' underline="none" href="/dashboard">
            <Typography display="inline"> {Body("okay hooray body text hover")} </Typography>
        </Link>
    </Box>
}

export default Words;