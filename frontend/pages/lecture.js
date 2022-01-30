import * as React from 'react';
import Layout from '../components/Layout';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

import Words from '../components/Words';
import Figure from '../components/Figure';
import Header from '../components/Header';

const CustomButton = styled(Button)(({ theme }) => ({
    fontWeight: 400,
    backgroundColor: "#36393F",
    color: "#D2D2D2",
    '&:hover': {
      backgroundColor: "#2A2C31",
    },
}));

const loren_ipsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum";

export default function Lecture() {
    return(
        <Layout>
            <Link href={"/dashboard"} >
                <CustomButton sx={{ my: "1rem" }} variant="contained">
                    Back to Dashboard
                </CustomButton>
            </Link>
            <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    my: 4
            }}>
                {/* words column */}
                <Box sx={{ display: 'flex', flexDirection: 'column' }} >
                    <Header> This is a header I guess </Header>
                    <Words speaker="speaker guy" body={loren_ipsum}/>
                    <Words speaker="guy" body={loren_ipsum}/>

                    <Header> This is a header I guess </Header>
                    <Words speaker="this is a test to see how long names can be" body={loren_ipsum}/>
                </Box>

                {/* images column */}
                <Box>
                    <Figure img="/img/geese_moving.gif" />
                    <Figure img="/img/geese_moving.gif" />
                    <Figure img="/img/geese_moving.gif" />
                    <Figure img="/img/geese_moving.gif" />
                </Box>
            </Box>
        </Layout>
    );
}