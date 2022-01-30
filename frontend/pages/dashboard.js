import * as React from 'react';
import Layout from '../components/Layout';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CustomCard from '../components/Card';
import Box from '@mui/material/Box';

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <Layout>
        <CustomCard />
        <CustomCard />
        <CustomCard />
      </Layout>
      <Footer />
    </>
  );
}
