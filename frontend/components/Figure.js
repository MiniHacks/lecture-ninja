import * as React from 'react';
import Box from "@mui/material/Box";

const style = {
    padding: "1rem",
}

export default function Figure({img}) {
    return <Box
        component="img"
        sx={{
            maxWidth: 400,
        }}
        alt="cool lecture pics"
        src={img}
    />
}