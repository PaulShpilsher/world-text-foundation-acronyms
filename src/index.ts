import { app } from "./app";
import http from "http"
import { config } from "node-config-ts";
import { startDatabase } from "./database";

startDatabase();

// Create HTTP server.
const server = http.createServer(app);

server.listen(config.port, () => {
    console.log(`listening at http://localhost:${config.port}`)
});
