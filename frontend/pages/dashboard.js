import * as React from 'react';
import CustomCard from '../components/Card';
import Layout from "../components/Layout";
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

const data = [{
    title: "This is a card title.",
    description: "This is a card description. This is a card description. This is a card description. This is a card description. This is a card description. This is a card description. This is a card description. This is a card description. This is a card description. This is a card description. This is a card description. This is a card description. This is a card description. This is a card description. This is a card description. This is a card description. This is a card description. This is a card description. ",
    number: "1",
    date: Date.now(),
    isLoading: true,
    image: "./img/thumbnail_placeholder.png"
}, {
    title: "This is a card title.",
    description: "This is a card description. This is a card description. This is a card description. This is a card description. This is a card description. This is a card description. This is a card description. This is a card description. This is a card description. This is a card description. This is a card description. This is a card description. This is a card description. This is a card description. This is a card description. This is a card description. This is a card description. This is a card description. ",
    number: "1",
    date: Date.now(),
    isLoading: false,
    image: "./img/thumbnail_placeholder.png"
}];

export default function Dashboard() {
    const {data: session, status} = useSession();
    const router = useRouter();
    if (status === "unauthenticated") router.push("/");
    const [cards, setCards] = useState([]);
    useEffect(() => {
        if(!session) return;
        fetch(process.env.NEXT_PUBLIC_BACKEND + "/dash?email=" + session.user.email)
            .then(r => r.json())
            .then(r => {
                setCards(r.map(item => ({
                    ...item,
                    title: item.class + " - " + item.lecture,
                    description: "\"This is a card description. This is a card description. This is a card description. This is a card description. This is a card description. This is a card description. This is a card description. This is a card description. This is a card description. This is a card description. This is a card description. This is a card description. This is a card description. This is a card description. This is a card description. This is a card description. This is a card description. This is a card description.",
                    number: 1,
                    image: "./img/thumbnail_placeholder.png"
                })))
            })
    }, [session])
    return (<>
        <Layout>
            {cards.map((d, i) => <CustomCard {...d} key={i + JSON.stringify(d)}/>)}
        </Layout>
    </>);
}
