import express from "express";
import { createServer } from "node:http";

import { Server } from "socket.io";

import mongoose from "mongoose";

import cors from "cors";
import { connnectToSocket } from "./controllers/socketManager.js";

const app = express();
const server = createServer(app);
const io = connnectToSocket(server);

app.set("port", process.env.PORT || 8080);
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.get("/", (req, res) => {
  res.send("worling");
});

const start = async () => {
  app.set("mongo_user");
  const connectionDb = await mongoose.connect(
    "mongodb+srv://parikshitjaiswal82:hL4OAsacVoCHDUWq@fluxdb.gufll.mongodb.net/"
  );
  console.log(`MONGO CONNECTED DB HOST: ${connectionDb.connection.host}`);
  server.listen(app.get("port"), () => {
    console.log(`LISTENING ON PORT 8080`);
  });
};

start();
