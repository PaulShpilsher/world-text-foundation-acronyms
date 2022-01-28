import { app } from "./app";
import http from "http"
import { config } from "node-config-ts";
import { startDatabase } from "./database/database";
import { seedDatabase } from "./database/seed";
import { exit } from "process";

const start = async () => {
    try {
        await startDatabase();
        if(process.env.NODE_ENV !== "production") {
            await seedDatabase();
        }

        // Create HTTP server.
        const server = http.createServer(app);

        server.listen(config.port, () => {
            console.log(`listening at http://localhost:${config.port}`)
        });
    }
    catch(error) {
        console.error(error);
        exit(-1);
    }
};

console.info(`Starting... [${process.env?.NODE_ENV}]`);
console.log("Config", config);
start();