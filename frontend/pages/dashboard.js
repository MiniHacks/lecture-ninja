import * as React from 'react';
import CustomCard from '../components/Card';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';


export default function Dashboard() {
  return (
    <>
      <Box sx={{ ml: "3.75rem" }}> {/* FIXME */}
          {/* delete later - just meant as a  */}
          <Skeleton sx={{ maxWidth: 1360,  mx: "1rem"}} animation="wave">
            <CustomCard />
          </Skeleton>
          <CustomCard />
          <CustomCard />
          <CustomCard />
      </Box>
    </>
  );
}
