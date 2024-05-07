import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./db/index.js";
import startSocketServer from "./socket/socket.js";
import http from "http";
dotenv.config();
const server = http.createServer(app);

connectDB()
  .then(() => {
    server.listen(process.env.PORT || 3000, () => {
      console.log(`server is running at port:${process.env.PORT}`);
    });

    server.on("error:", (error) => {
      throw error;
    });
    // here to start the socket Server
    startSocketServer(server);
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
