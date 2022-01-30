import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import {useRouter} from "next/router";
import Layout from "../../components/Layout";
import Typography from "@mui/material/Typography";
import Words from "../../components/Words";
import PlaybackBar from '../../components/PlaybackBar';

export default function lecture() {
    const router = useRouter();
    console.log(router.query);
    const {lectureid} = router.query

    const [info, setInfo] = useState({})
    const [time, setTime] = useState(0);
    const [maxTime, setMaxTime] = useState(0);
    const videoRef = useRef();
    const [paused, setPaused] = useState(true);

    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_BACKEND + "/info/" + lectureid).then(r => r.json()).then(r => {
            setInfo(r)
        })
    }, [lectureid])

    useEffect(() => {
        videoRef.current.currentTime = time ? +time : 0;
    }, [time])

    useEffect(() => {
        setTime(videoRef.current.duration)
    }, [videoRef.current])

    useEffect(() => {
        if (paused)
            videoRef.current.pause();
        else
            videoRef.current.play();
    }, [paused])


    return (<>
        <Layout>
            <Typography variant={"h1"} mt={4}>
                {info.class} - {info.lecture}
            </Typography>

            {parser(info?.data ?? {}, setTime)}

        </Layout>
        <PlaybackBar secondsElapsed={videoRef.current?.currentTime || time || 0} secondsTotal={94} paused={paused}
                     onPauseClicked={() => setPaused(pv => !pv)}
                     videoTitle={`${info.class} - ${info.lecture}`}/>
        <video src={process.env.NEXT_PUBLIC_BACKEND + "/file/" + lectureid} ref={videoRef} style={{
            position: "fixed", bottom: 20, right: 20, width: 16 * 30, height: 9 * 30, background: "black"
        }}/>
    </>);
}

const parser = (item, setTime) => {
    switch (item.kind) {
        case "section":
            return item.contents.map(a => parser(a, setTime));
        case "heading":
            return <Typography mt={4} variant={"h3"} onClick={() => setTime(item.timestamp)}>{item.text}</Typography>
        case "figure":
            return <figure onClick={() => setTime(item.timestamp)}>
                <img src={item.image_url} style={{maxWidth: 400}}
                     alt={item.caption}/>
                <figcaption>{item.caption}</figcaption>
            </figure>
        case "paragraph":
            return <Words onClick={(time) => {
                setTime(time);
            }} speaker={item.contents?.[0]?.speaker_tag}
                          body={item.contents}/>
        default:
            return JSON.stringify(item);
    }
}
