"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const date_fns_1 = require("date-fns");
const app = (0, express_1.default)();
// Express CORS setup
app.use((0, cors_1.default)({
    origin: "*",
}));
const httpServer = (0, http_1.createServer)(app);
// Socket.IO setup with CORS
const io = new socket_io_1.Server(httpServer);
io.on("connection", (socket) => {
    console.log("New client: ", socket.id);
});
io.engine.on("connection_error", (err) => {
    console.log(err.req); // the request object
    console.log(err.code); // the error code, for example 1
    console.log(err.message); // the error message, for example "Session ID unknown"
    console.log(err.context); // some additional error context
});
const port = 3099;
httpServer.listen(port, () => {
    console.log(`Running at ${port}\n${(0, date_fns_1.format)(new Date(), 'yyyy-MM-dd HH:mm:ss')}`);
});
//# sourceMappingURL=index.js.map