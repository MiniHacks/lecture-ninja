import Box from "@mui/material/Box";

const Layout = ({children}) => {
    return <Box mx={"max(2px, 5%)"}>
        {children}
    </Box>
}
export default Layout;
