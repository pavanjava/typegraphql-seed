import {testConn} from "../../test-utils/TestConn";
import {Connection} from "typeorm";
import {graphqlUtil} from "../../test-utils/graphql-util";

let conn: Connection;
beforeAll(async () => {
    conn = await testConn()
});

afterAll(async () => {
    if (conn) {
        await conn.close();
    }
});

const findAllQuery = `query FindAll {
    findAll {
        id
        firstName
        lastName
        email
        name
    }
}`;

describe("All Finder Queries", () => {
    it("should get all users", async (done) => {
        const response = await graphqlUtil({
            source: findAllQuery, variableValues: {}
        });
        console.log(response);
        done();
    });
});
