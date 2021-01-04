import "reflect-metadata";
import {ApolloServer} from "apollo-server-express";
import * as Express from "express";
import {buildSchema} from "type-graphql";
import {createConnection} from "typeorm";
import {RegisterResolver} from "./modules/user/Resgister";
import {FinderResolver} from "./modules/user/Finder";
import {LoginResolver} from "./modules/user/Login";

const SERVER_PORT: number = 3000;

const server = async () => {

    await createConnection();

    const schema = await buildSchema({
        resolvers:[RegisterResolver, FinderResolver, LoginResolver]
    })
    const apolloServer = new ApolloServer({schema})
    const app = Express();

    apolloServer.applyMiddleware({app});
    app.listen(SERVER_PORT);
    return app;
}

server().then(() => {
    console.log(`Server started on port ${SERVER_PORT}. start the playground as http://localhost:3000/graphql` )
});

