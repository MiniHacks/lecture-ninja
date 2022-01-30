import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord"

import {MongoDBAdapter} from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb";


export default NextAuth({
    secret: process.env.AUTH_SECRET,
    providers: [
        new GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
        new DiscordProvider({
            clientId: process.env.DISCORD_ID,
            clientSecret: process.env.DISCORD_SECRET
        })
    ],
    adapter: MongoDBAdapter(clientPromise),
    session: async (session, user) => {
        session.id = user.id
        return Promise.resolve(session)
    }
})
