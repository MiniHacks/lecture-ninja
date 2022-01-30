import * as React from 'react';
import Box from '@mui/material/Box';

export default function Footer() {
    return (
        <Box sx={{
            background: "#33363A",
            display: "flex",
            minHeight: "10vh",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
            fontWeight: "light",
        }}>
            Made for TamuHacks by Covert Geese
        </Box>
    );
}
