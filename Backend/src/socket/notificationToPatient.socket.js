const handleNotificationSendtoPatient = (socket, io) => {
  socket.on("sendNotificationtoPatient", ({ patientId, status }) => {
    console.log(patientId, status);
    io.emit("receivedNotificationtoPatient", { patientId, status });
  });
};
export default handleNotificationSendtoPatient;
