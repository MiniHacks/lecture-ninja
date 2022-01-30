import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {CacheProvider} from '@emotion/react';
import theme from '../src/theme';
import createEmotionCache from '../src/createEmotionCache';
import {SessionProvider} from "next-auth/react"
import {Box} from "@mui/material";
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function App({
                                Component, pageProps: {session, ...props},
                            }) {
    const {emotionCache = clientSideEmotionCache, pageProps} = props;
    console.log(session);
    return (<CacheProvider value={emotionCache}>
        <Head>
            <meta name="viewport" content="initial-scale=1, width=device-width"/>
        </Head>
        <SessionProvider session={session}>
            <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline/>
                <Navbar/>
                <Box minHeight={"calc(100vh - 300px)"}>
                    <Component {...pageProps} />
                </Box>
                <Footer/>
            </ThemeProvider>
        </SessionProvider>
    </CacheProvider>);
}

App.propTypes = {
    Component: PropTypes.elementType.isRequired, emotionCache: PropTypes.object, pageProps: PropTypes.object.isRequired,
};
