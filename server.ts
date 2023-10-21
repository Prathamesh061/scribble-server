import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.URL }));

const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: process.env.URL } });

io.on("connection", (socket: Socket) => {
  socket.on("beginPath", (arg: any) => {
    socket.broadcast.emit("beginPath", arg);
  });

  socket.on("drawLine", (arg: any) => {
    socket.broadcast.emit("drawLine", arg);
  });

  socket.on("changeConfig", (arg: any) => {
    socket.broadcast.emit("changeConfig", arg);
  });

  socket.on("activeItem", (arg: any) => {
    socket.broadcast.emit("activeItem", arg);
  });

  socket.on("actionTaken", (arg: any) => {
    socket.broadcast.emit("actionTaken", arg);
  });
});

httpServer.listen(process.env.PORT, () => {
  console.log(`Server is up and running`);
});
