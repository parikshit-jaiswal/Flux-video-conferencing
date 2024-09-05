import { Server } from "socket.io";

export const connnectToSocket = (server) => {
  const io = new Server(server);
  return io;
};
