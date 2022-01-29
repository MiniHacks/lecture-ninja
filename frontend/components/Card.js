import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

// card

export default function CustomCard() {
  return (
    <Card sx={{ maxWidth: 1060 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            This is a card title.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This is a card description. This is a card description.
            This is a card description. This is a card description.
            This is a card description.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
