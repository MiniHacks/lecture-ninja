import * as React from 'react';
import {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import Layout from "../../components/Layout";
import Typography from "@mui/material/Typography";
import Words from "../../components/Words";
import PlaybackBar from '../../components/PlaybackBar';

export default function lecture() {
    const router = useRouter();
    console.log(router.query);
    const {lectureid} = router.query

    const [data, setData] = useState({notLoaded: true});
    const [info, setInfo] = useState({})
    const [time, setTime] = useState(0);
    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_BACKEND + "/info/" + lectureid).then(r => r.json()).then(r => {
            setInfo(r)
            setData(r.data);
        })
    }, [lectureid])
    return (<>
        <Layout>

            {JSON.stringify(data)}

            {JSON.stringify(info)}

            <Typography variant={"h1"} mt={4}>
                {info.class} - {info.lecture}
            </Typography>

            <Typography variant={"body1"} mt={2}>
                Summary for: {info.class} - {info.lecture} - {time}
            </Typography>
            {parser(data, setTime)}
            <video src={process.env.NEXT_PUBLIC_BACKEND + "/file/" + lectureid} style={{
                position: "fixed",
                bottom: 20,
                right: 20,
                width: 16 * 30,
                height: 9 * 30,
                background: "black"
            }}/>
        </Layout>
        <PlaybackBar secondsElapsed={10} secondsTotal={11} paused={false} videoTitle={
            `${info.class} - ${info.lecture}`
        }/>
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
                <img src={item.image_url}
                     alt={item.caption}/>
                <figcaption>{item.caption}</figcaption>
            </figure>
        case "paragraph":
            return item.contents.map(a => <Words onClick={() => setTime(a.timestamp)} speaker={a.speaker_tag}
                                                 body={a.contents}/>)
        default:
            return JSON.stringify(item);
    }
}
