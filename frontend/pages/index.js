import * as React from 'react';
import {useEffect, useState} from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LoginModal from "../components/Modals/Login";
import Layout from "../components/Layout";
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";

export default function Index() {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const {data: session} = useSession();
    const router = useRouter();
    if(session) {
        router.push("/dashboard#upload");
    }
    return (
        <Layout>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                my: 4 }}
            >
                {/* text */}
                <Box sx={{ }} >
                    {/* FIXME: add navbar */}
                    <Typography fontFamily="Fredoka One" fontWeight="medium" sx={{ my: "2rem" }} variant="h1" component="h1" gutterBottom>
                        Did you ever wish you could’ve rewinded an IRL
                        lecture?
                    </Typography>

                    <Typography sx={{ my: "2rem" }} variant="body1" component="h1" gutterBottom>
                        We transcribe videos into digestible 'textbook-like' documents for you, complete with
                        generated headings, timestamps, images, and an automated summary.
                    </Typography>

                    <Box>
                        <Button sx={{ mr: "1rem", px: "2rem" }} variant="contained" onClick={() => {setShowLoginModal("signup"); }}>
                            Start
                        </Button>
                        <Button sx={{ px: "2rem" }} variant="outlined" onClick={() => { setShowLoginModal("login"); }}>
                            Login
                        </Button>
                    </Box>
                </Box>

                <Box
                    component="img"
                    sx={{
                    height: 450,
                    width: 495,
                    }}
                    alt="ninja goose"
                    src="../img/mascot.png"
                />
            </Box>
            {showLoginModal && <LoginModal handleClose={() => setShowLoginModal(null)} isLogin={showLoginModal == "login" } />}
        </Layout>
    );
}
