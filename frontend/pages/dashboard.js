import * as React from 'react';
import CustomCard from '../components/Card';
import Layout from "../components/Layout";

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
    return (<>
        <Layout>
            {data.map((d, i) => <CustomCard {...d} key={i + JSON.stringify(d)}/>)}
        </Layout>
    </>);
}
