import * as React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea, Skeleton} from '@mui/material';
import dayjs from "dayjs";

export default function CustomCard({title, number, description, date, isLoading, image}) {
    return (<Card sx={{borderRadius: 2, my: "1rem", position: "relative"}}>
        {isLoading && <Box position={"absolute"} top={-120} left={0} width={"100%"}>
            <Skeleton width={"100%"} height={480} sx={{m: 0}}/>
        </Box>}
        <CardActionArea>
            <CardContent>
                <Box sx={{
                    display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: "center"
                }}>

                    {/* card image */}
                    <CardMedia sx={{
                        mr: "1rem",
                        borderRadius: 2,
                        width: 200,
                        maxWidth: 200,
                        height: 150,
                        maxHeight: 150,
                        transform: isLoading ? "scaleX(-1)" : ""

                    }}
                               component="img"
                               image={isLoading ? "/img/geese_moving.gif" : image}
                               alt="lecture thumbnail"
                    />

                    {/* info section */}
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        height: 150,
                        flexGrow: 1
                    }}>
                        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Typography gutterBottom variant="h5" component="div">
                                {title}
                            </Typography>
                            <Typography gutterBottom variant="h5" color="text.secondary" component="div">
                                #{number}
                            </Typography>
                        </Box>
                        <Typography variant="body2" gutterBottom>
                            {!isLoading && description}
                        </Typography>
                        <Typography sx={{fontSize: 14}} color="text.secondary">
                            {isLoading ? "The ninjas are currently processing your video!" : `Uploaded on ${dayjs(date).format("MMMM D, YYYY h:m A")}`}
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </CardActionArea>
    </Card>);
}
