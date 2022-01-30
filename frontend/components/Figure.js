import * as React from 'react';

const style = {
    maxWidth: "30%"
}

export default function Figure({img}) {
    return <Box sx={style}>
        <img src={img} alt="alt text"/>
    </Box>
}