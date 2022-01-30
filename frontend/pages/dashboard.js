import * as React from 'react';
import CustomCard from '../components/Card';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Layout from "../components/Layout";


export default function Dashboard() {
  return (
    <>
      <Layout>
          <Skeleton sx={{ my: "1rem"}} animation="wave">
            <CustomCard />
          </Skeleton>
          <CustomCard />
          <CustomCard />
          <CustomCard />
      </Layout>
    </>
  );
}
