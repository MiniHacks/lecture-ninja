import {signOut, useSession} from "next-auth/react";
import Layout from "./Layout";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

const Navbar = () => {
    const {data: session} = useSession();

    return (
        <>
            <Box sx={{background: "linear-gradient(117.6deg, #FD360B -3.95%, #D300FF 69.63%)", height: "5px"}}>
                &nbsp;
            </Box>
            <Layout>
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                    <Link href={"/"}><img src="/img/logo_wide.png" alt="logo" height={"75px"} style={{margin: "10px 0"}}/></Link>
                    <Box display={"flex"} alignItems={"center"}>
                        {session && <Typography mr={4} onClick={() => signOut()} sx={{cursor: "pointer"}} title={"Logout"}>{session.user.email}</Typography>}
                        {session && <Button variant={"contained"} sx={{fontWeight: "900", fontSize: 25}}>upload
                            lecture</Button>}
                    </Box>
                </Box>
            </Layout>
        </>
    )
}
export default Navbar;
