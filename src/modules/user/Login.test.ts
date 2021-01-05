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

const loginQuery = `query($email: String!, $password: String!){
    login(email:$email,password:$password) {
        id
        firstName
        lastName
        email
        name
    }
}`;

describe("Login Queries", () => {
    it("should login user", async (done) => {
        const response = await graphqlUtil({
            source: loginQuery, variableValues: {email:"test@test.com", password: "test1"}
        });
        console.log(response);
        done();
    });

    it("should fail login: user pwd doesn't match", async (done) => {
        const response = await graphqlUtil({
            source: loginQuery, variableValues: {email:"test@test.com", password: "test"}
        });
        console.log(response);
        done();
    });

    it("should fail login: user doesnt exist", async (done) => {
        const response = await graphqlUtil({
            source: loginQuery, variableValues: {email:"test@test1.com", password: "test1"}
        });
        console.log(response);
        done();
    });
});
