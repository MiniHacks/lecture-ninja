import * as React from 'react';

const style = {
    maxWidth: "30%"
}

export default function Figure({img}) {
    return <Box 
        display={"flex"}
        flexDirection={"row"}
        alignItems={"flex-start"}
        my={3}
        sx={style}
    >
        <img src={img} alt="alt text"/>
    </Box>
}