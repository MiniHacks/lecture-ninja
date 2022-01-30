import * as React from 'react';
import {useState} from 'react';
import Layout from '../components/Layout';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LoginModal from "../components/Modals/Login";
import ProTip from '../src/ProTip';
import Link from '../src/Link';
import Copyright from '../src/Copyright';

export default function Index() {
    const [showLoginModal, setShowLoginModal] = useState(false);
    let isLogin = false;
    return (
        <Layout>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', my: 4 }}>
                {/* text */}
                <Box> 
                    {/* FIXME: add navbar */}

                    <Typography variant="h2" component="h1" gutterBottom>
                        Did you ever wish you could’ve rewinded an IRL
                        lecture?
                    </Typography>
                    <Typography variant="body1" component="h1" gutterBottom>
                        we transcribe videos into digestible sections with timestamps, images, and bolded key points or something wooo. we make things accessible
                    </Typography>

                    {/* button */}
                        <Button variant="contained" onClick={() => {setShowLoginModal(true)}}>
                            Start
                        </Button>
                        <Button variant="outlined" onClick={() => {setShowLoginModal(true); isLogin=true}}>
                        Login
                        </Button>

                    {/* delete later */}
                    <div>
                        <Link href="/about" color="secondary">
                            Go to the about page |
                        </Link>
                        <Link href="/dashboard" color="secondary">
                            | dashboard page
                        </Link>
                    </div>
                </Box>

                <Box sx={{}}>
                    <img src="../img/mascot.png" alt="ninja goose" />
                </Box>
            </Box>
            {showLoginModal && <LoginModal handleClose={() => setShowLoginModal(false)} isLogin={isLogin} />}
        </Layout>
    );
}
