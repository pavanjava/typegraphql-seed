import {graphql} from "graphql"
import {buildSchema} from "type-graphql";
import {RegisterResolver} from "../modules/user/Resgister";
import {FinderResolver} from "../modules/user/Finder";

interface IOptions {
    source: string;
    variableValues?: any;
}

export const graphqlUtil = async ({source, variableValues}: IOptions) => {
    const schema = await buildSchema({
        resolvers: [RegisterResolver, FinderResolver]
    })
    return graphql({schema, source, variableValues})
}
