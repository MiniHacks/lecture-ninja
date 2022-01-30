import * as React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

// card

export default function CustomCard() {
    return (
        <Card sx={{ maxWidth: 1060 }}>
            <CardActionArea>
                <CardContent>
                    {/* card image */}
                    <CardMedia
                        component="img"
                        width="164"
                        height="100"
                        image="./thumbnail_placeholder.png"
                        alt="lecture thumbnail"
                    />
                    {/* info section */}

                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Typography gutterBottom variant="h5" component="div">
                            This is a card title.
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div">
                            #1
                        </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        This is a card description. This is a card description.
                        This is a card description. This is a card description.
                        This is a card description.
                    </Typography>
                    <Typography sx={{ fontSize: 12 }} color="text.secondary">
                        Uploaded April 1, 2022 at 12:14 AM
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
