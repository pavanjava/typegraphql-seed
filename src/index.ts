import "reflect-metadata";
import {ApolloServer} from "apollo-server-express";
import * as Express from "express";
import {Arg, buildSchema, Query, Resolver} from "type-graphql";

@Resolver()
class HelloResolver {

    @Query(() => String, {nullable: true})
    async hello(@Arg("name") name: string) {
        return "Hello"+` ${name || 'World'}`;
    }
}

const SERVER_PORT: number = 3000;

const server = async () => {
    const schema = await buildSchema({
        resolvers:[HelloResolver]
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

