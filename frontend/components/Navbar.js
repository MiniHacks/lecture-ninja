import {useSession} from "next-auth/react";
import Layout from "./Layout";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const Navbar = () => {
    const {data: session} = useSession();

    return (
        <Box>
            <Box sx={{background: "linear-gradient(117.6deg, #FD360B -3.95%, #D300FF 69.63%)", height: "5px"}}>
                &nbsp;
            </Box>
            <Layout>
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                    <img src="/img/logo_wide.png" alt="logo" height={"75px"} style={{margin: "10px 0"}}/>
                    <Box display={"flex"} alignItems={"center"}>
                        {session && <Typography mr={4}>{session.user.email}</Typography>}
                        {session && <Button variant={"contained"} sx={{fontWeight: "900", fontSize: 25}}>upload
                            lecture</Button>}
                    </Box>
                </Box>
            </Layout>
        </Box>
    )
}
export default Navbar;
