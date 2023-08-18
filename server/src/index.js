const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = 3000;

io.on("connection", (socket) => {
  console.log("a user connected");
  //welcome message from server
  // socket.emit("message", "Hi, welcome to chat...");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("message", (message) => {
    io.emit("message",message);
  });
});

server.listen(port, () => {
  console.log(`Listening on *:${port}`);
});
