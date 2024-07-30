import { Server } from 'socket.io';
import http from 'http';
import express from 'express';
import cors from 'cors';  // Import cors

const app = express();
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}));  // Use cors middleware

const server = http.createServer(app); // CREATING HTTP SERVER
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true
    }
});  // Socket server

const userSocketMap = {}

export const getRecipientSocketId = (recipientId) => {
    return userSocketMap[recipientId];
}

io.on("connection", (socket) => {
    console.log("a user connected", socket.id);
    const userId = socket.handshake.query.userId;

    if (userId != "undefined") userSocketMap[userId] = socket.id;
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("user disconnected");
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap)); // I AM SENDING THIS EVENT 
    })
    socket.on("join-room", (room) => {
        socket.join(room);
    })
    socket.on("message", (message) => {
        io.to(message.room).emit("createMessage", message);
    })
})

export { io, server, app };

