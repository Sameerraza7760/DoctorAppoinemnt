const handleReviewAdded = (socket, io) => {
  socket.on("createAppointment", ({ doctorId, patientId }) => {
    const notificationMessage = "You have a new appointment request.";
    io.emit("notificationSendToTheDoctor", {
      doctorId,
      patientId,
      message: notificationMessage,
    });
  });
};

export default handleReviewAdded;
