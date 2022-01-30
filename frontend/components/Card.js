import * as React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea} from '@mui/material';

export default function CustomCard({title, number, description, date, isLoading, image}) {
    return (<Card sx={{borderRadius: 2, my: "1rem"}}>
        <CardActionArea>
            <CardContent>
                <Box sx={{
                    display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: "center"
                }}>

                    {/* card image */}
                    <CardMedia sx={{mr: "1rem", borderRadius: 2, width: 250, height: 150}}
                               component="img"
                               image={image}
                               alt="lecture thumbnail"
                    />

                    {/* info section */}
                    <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 150}}>
                        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Typography gutterBottom variant="h5" component="div">
                                {title}
                            </Typography>
                            <Typography gutterBottom variant="h5" color="text.secondary" component="div">
                                #{number}
                            </Typography>
                        </Box>
                        <Typography variant="body2" gutterBottom>
                            {description}
                        </Typography>
                        <Typography sx={{fontSize: 12}} color="text.secondary">
                            Uploaded {date}
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </CardActionArea>
    </Card>);
}
