import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { format } from 'date-fns';

interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
  hello: () => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  name: string;
  age: number;
}

const app = express();

// Express CORS setup
app.use(cors({
  origin: "*",
}));
const httpServer = createServer(app);

// Socket.IO setup with CORS
const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(httpServer);
io.on("connection", (socket) => {
  console.log("New client: ", socket.id);
});

io.engine.on("connection_error", (err) => {
  console.log(err.req);      // the request object
  console.log(err.code);     // the error code, for example 1
  console.log(err.message);  // the error message, for example "Session ID unknown"
  console.log(err.context);  // some additional error context
});

const port = 3099;
httpServer.listen(port, () => {
  console.log(`Running at ${port}\n${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`);
});
