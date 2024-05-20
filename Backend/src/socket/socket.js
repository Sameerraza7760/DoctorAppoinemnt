import { Server } from "socket.io";
import handleNotificationSend from "./notificationToDoctor.socket.js";
import handleAppointmentStatusUpdated from "./appointmentStatus.socket.js";
import handleNotificationSendtoPatient from "./notificationToPatient.socket.js";
import handleReviewAdded from "./review.socket.js";
import handleSendMessege from "./Conversation.socket.js";
const startSocketServer = (server) => {
  const io = new Server(server, {
    transports: ["websocket"],
  });

  io.on("connection", (socket) => {
    console.log("A client connected");
    handleReviewAdded(socket, io);
    handleAppointmentStatusUpdated(socket, io);
    handleNotificationSend(socket, io);
    handleNotificationSendtoPatient(socket, io);
    handleSendMessege(socket, io); 
    socket.on("disconnect", () => {
      console.log("A client disconnected");
    });
  });
};

export default startSocketServer;
