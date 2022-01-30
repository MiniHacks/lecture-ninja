import * as React from 'react';
import Box from "@mui/material/Box";

const style = {
    width: 200,
    maxWidth: 200,
    height: 150,
    maxHeight: 150,
    padding: "1rem",
}

export default function Figure({img}) {
    return <Box
        component="img"
        sx={{
            width: 200,
            maxWidth: 200,
        }}
        alt="cool lecture pics"
        src={img}
    />
}