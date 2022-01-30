import {signOut, useSession} from "next-auth/react";
import Layout from "./Layout";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import {useEffect, useState} from "react";
import UploadModal from "./Modals/Upload";
import {useRouter} from "next/router";

const Navbar = () => {
    const {data: session} = useSession();
    const [showUploadModal, setShowUploadModal] = useState(false);
    const router = useRouter();

    useEffect(() => {
        console.log("herf", router.asPath);
        if (router.asPath.endsWith("#upload")){
            setShowUploadModal(true);
        } else {
            setShowUploadModal(false);
        }
    }, [router.asPath])

    useEffect(() => {
        console.log(session);
    }, [session])
    return (<>
        <Box sx={{background: "linear-gradient(117.6deg, #FD360B -3.95%, #D300FF 69.63%)", height: "5px"}}>
            &nbsp;
        </Box>
        <Layout>
            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                <Link href={!!session ? "/dashboard" : "/"}><img src="/img/logo_wide.png" alt="logo" height={"75px"}
                                                                 style={{margin: "10px 0 10px -80px"}}/></Link>
                <Box display={"flex"} alignItems={"center"}>
                    {session && <Typography mr={4} onClick={() => signOut()} sx={{cursor: "pointer"}}
                                            title={"Logout"}>{session?.user?.email}</Typography>}
                    {session && <Button onClick={() => setShowUploadModal(true)} variant={"contained"}
                                        sx={{fontWeight: "900", fontSize: 25}}>upload
                        lecture</Button>}
                </Box>
            </Box>
        </Layout>
        {showUploadModal && <UploadModal handleClose={() => setShowUploadModal(false)}/>}
    </>)
}
export default Navbar;
