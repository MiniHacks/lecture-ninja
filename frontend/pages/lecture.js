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
                <Box sx={{ display: 'flex', flexDirection: 'column' }} >
                    <Header> This is a header I guess </Header>
                    <Words speaker="speak" body="test these are some words"/>
                </Box>
            </Box>
        </Layout>
    );
}