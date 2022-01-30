import * as React from 'react';
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';

const style = {
    
}

const Header = ({children}) => {
    return <Box sx={style}>
        <Typography variant="h3" sx={{my: 2}}> {children} </Typography>
        
    </Box>
}

export default Header;