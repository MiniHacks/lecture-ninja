import * as React from 'react';
import Box from '@mui/material/Box';

export default function Footer() {
    return (
        <Box sx={{
            background: "#191919",
            display: "flex",
            minHeight: "15vh", /* FIXME */
            p: "1rem",

            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
            fontWeight: "light",
        }}>
            Made for TamuHacks by Covert Geese
        </Box>
    );
}
