import * as React from 'react';
import CustomCard from '../components/Card';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Layout from "../components/Layout";

const props = {
    title: "This is a card title.",
    description: "This is a card description. This is a card description. This is a card description. This is a card description. This is a card description. This is a card description. This is a card description. This is a card description. This is a card description. This is a card description. This is a card description. This is a card description. This is a card description. This is a card description. This is a card description. This is a card description. This is a card description. This is a card description. ",
    number: "1",
    date: Date.now(),
    isLoading: false,
    image: "./img/thumbnail_placeholder.png"
}

export default function Dashboard() {
  return (
    <>
      <Layout>
          <Skeleton sx={{ my: "1rem"}} animation="wave">
            <CustomCard />
          </Skeleton>
          <CustomCard {...props} />
          <CustomCard {...props} />
          <CustomCard {...props} />
      </Layout>
    </>
  );
}
