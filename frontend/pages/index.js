import * as React from 'react';
import {useState} from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LoginModal from "../components/Modals/Login";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Index() {
    const [showLoginModal, setShowLoginModal] = useState(false);
    return (
        <>
            <Navbar />
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                mx: 14,
                my: 4 }}
            >
                {/* text */}
                <Box sx={{ mx: "2.5rem" }} > 
                    {/* FIXME: add navbar */}
                    <Typography fontFamily="Fredoka One" fontWeight="medium" sx={{ my: "2rem" }} variant="h1" component="h1" gutterBottom>
                        Did you ever wish you could’ve rewinded an IRL
                        lecture?
                    </Typography>
                    
                    <Typography sx={{ my: "2rem" }} variant="body1" component="h1" gutterBottom>
                        we transcribe videos into digestible sections with timestamps, images, and bolded key points or something wooo. we make things accessible
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
            <Footer />
        </>
    );
}
