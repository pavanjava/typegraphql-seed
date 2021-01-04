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

const loginQuerySuccess = `{
    login(email:"test@test.com",password:"test1") {
        id
        firstName
        lastName
        email
        name
    }
}`;

const loginQueryFail = `{
    login(email:"test@test.com",password:"test") {
        id
        firstName
        lastName
        email
        name
    }
}`;

const userDoesnotExist = `{
    login(email:"test@test1.com",password:"test") {
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
            source: loginQuerySuccess, variableValues: {}
        });
        console.log(response);
        done();
    });

    it("should fail login: user pwd doesn't match", async (done) => {
        const response = await graphqlUtil({
            source: loginQueryFail, variableValues: {}
        });
        console.log(response);
        done();
    });

    it("should fail login: user doesnt exist", async (done) => {
        const response = await graphqlUtil({
            source: userDoesnotExist, variableValues: {}
        });
        console.log(response);
        done();
    });
});
