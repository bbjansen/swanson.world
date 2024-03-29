import http from "http";
import express from "express";
import CORS from "cors";
import { Server } from "colyseus";
import { monitor } from "@colyseus/monitor";
// import socialRoutes from "@colyseus/social/express"

import { World } from "./rooms/World";

const port = Number(process.env.PORT || 8080);
const app = express()

app.use(CORS());
app.use(express.json())

const server = http.createServer(app);
const gameServer = new Server({
  server,
});

// register your room handlers
gameServer.define('world', World).enableRealtimeListing();

/**
 * Register @colyseus/social routes
 *
 * - uncomment if you want to use default authentication (https://docs.colyseus.io/server/authentication/)
 * - also uncomment the import statement
 */
// app.use("/", socialRoutes);

// register colyseus monitor AFTER registering your room handlers
app.use("/admin", monitor());

gameServer.listen(port);
console.log(`Listening on ws://swanson.world:${ port }`)
