import {createConnection} from "typeorm";
import * as path from "path";

export const testConn = (drop: boolean = false) => {
    return createConnection({
        "type": "postgres",
        "host": "localhost",
        "port": 5432,
        "username": "postgres",
        "password": "postgres",
        "database": "integration_test",
        "logging": false,
        "synchronize": drop,
        "dropSchema": drop,
        "entities": [path.join(__dirname,"../entities/*.*")]
    })
}
