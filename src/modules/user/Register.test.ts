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

const registerMutation = `mutation Register($data: RegisterInput!) {
    register(data: $data) {
        id
        firstName
        lastName
        email
        name
    }
}`;

describe("register", () => {
    it("should create user", async (done) => {
        const response = await graphqlUtil({
            source: registerMutation, variableValues: {
                "data": {
                    "firstName": "test",
                    "lastName": "test",
                    "email": "test@test.com",
                    "password": "test1"
                }
            }
        });
        console.log(response);
        done();
    });
});
