import Box from "@mui/material/Box";

const Layout = ({children}) => {
    return <Box display={"flex"} justifyContent={"center"}>
        <Box mx={"max(2px, 5%)"} maxWidth={"1500px"} width={"100%"}>
            {children}
        </Box>
    </Box>
}
export default Layout;
