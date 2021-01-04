import {graphql} from "graphql"
import {buildSchema} from "type-graphql";
import {RegisterResolver} from "../modules/user/Resgister";
import {FinderResolver} from "../modules/user/Finder";
import {LoginResolver} from "../modules/user/Login";

interface IOptions {
    source: string;
    variableValues?: any;
}

export const graphqlUtil = async ({source, variableValues}: IOptions) => {
    const schema = await buildSchema({
        resolvers: [RegisterResolver, FinderResolver, LoginResolver]
    })
    return graphql({schema, source, variableValues})
}
