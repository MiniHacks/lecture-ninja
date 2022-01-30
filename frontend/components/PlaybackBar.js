import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { padding } from '@mui/system';

const style = {
    position: 'fixed',
    bottom: 0,
    width: '100vw',
    height: `100px`,
    // background: 'green',
}

function doubleDigits(num) {
    if (num < 10) {
        return `0${Math.abs(num.toFixed(0))}`
    }
    return num.toFixed(0);
}

function secondsToTimestamp(seconds) {
    const hours = Math.floor(seconds / 3600);
    let remainingSeconds = seconds;
    if (hours > 0) {
        remainingSeconds = seconds - (hours * 3600);
    }

    const minutes = Math.floor(remainingSeconds / 60);
    if (minutes > 0) {
        remainingSeconds = remainingSeconds - (minutes * 60);
    }

    remainingSeconds = remainingSeconds | 0;

    return `${doubleDigits(hours)}:${doubleDigits(minutes)}:${doubleDigits(remainingSeconds)}`
}

export default function PlaybackBar({
    secondsElapsed,
    secondsTotal,
    videoTitle,
    paused,
    onPauseClicked = (noop) => {}
}) {
    const videoPctComplete = secondsElapsed / secondsTotal;

    return (
        <>

            <Paper style={style}>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Box sx={{ background: "#7879F1", height: "5px", width: `${100}%` }}>
                        <Box sx={{ background: "linear-gradient(117.6deg, #FD360B -3.95%, #D300FF 69.63%)", height: "5px", width: `${videoPctComplete * 100}%` }}>
                            &nbsp;
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ padding: '12px 15% 0', display: 'flex', flexDirection: 'row', gap: '6px' }}>
                    <Box>
                    <IconButton color="primary" aria-label={paused ? "play" : "pause"} component="span" onClick={onPauseClicked}>
                        {paused ? <PlayArrowIcon /> : <PauseIcon />}
                    </IconButton>

                    </Box>
                    <Box>
                        <Typography>
                            {secondsToTimestamp(secondsElapsed)} &nbsp; / &nbsp; {secondsToTimestamp(secondsTotal)}
                        </Typography>
                        <Typography variant="h4">
                            {videoTitle}
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </>
    )
}
