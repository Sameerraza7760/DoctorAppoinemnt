import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/index.js";
import app from "./app.js";
import { Server } from "socket.io";
import http from "http";
dotenv.config();
let io;
connectDB()
  .then(() => {
    const server = http.createServer(app);
    io = new Server(server);
    io.on("connection", (socket) => {
      console.log("A user connected");
      socket.on("disconnect", () => {
        console.log("User disconnected");
      });
    });

    server.listen(process.env.PORT || 3000, () => {
      console.log(`server is running at port:${process.env.PORT}`);
    });

    server.on("error", (error) => {
      throw error;
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
export { io };
