import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5000"],
    methods: ["GET", "POST"]
  }
})

export const getReceiverSocketId = (rid) => {
  return userSocketMap[rid]
}

const userSocketMap = {}

io.on("connection", (socket) => {

  const uid = socket.handshake.query.uid
  if (uid != "undefined") {
    userSocketMap[uid] = socket.id
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap))

  socket.on("disconnect", () => {
    delete userSocketMap[uid]
    io.emit("getOnlineUsers", Object.keys(userSocketMap))
  })
})

export { app, io, server }