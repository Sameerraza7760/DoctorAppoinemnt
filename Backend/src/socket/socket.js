// socket.js

import { Server } from "socket.io";
import handleReviewAdded from "./review.socket.js";
import handleAppointmentStatusUpdated from "./appointmentStatus.socket.js";

const startSocketServer = (server) => {
  const io = new Server(server, {
    transports: ["websocket"],
  });

  io.on("connection", (socket) => {
    console.log("A client connected");
    handleReviewAdded(socket, io);
    handleAppointmentStatusUpdated(socket, io);
    socket.on("disconnect", () => {
      console.log("A client disconnected");
    });
  });
};

export default startSocketServer;
