const handleReviewAdded = (socket, io) => {
  socket.on("createAppointment", (doctorId) => {
    const notificationMessage = "You have a new appointment request.";
    io.emit("notificationSendToTheDoctor", {
      doctorId,
      message: notificationMessage,
    });
  });
};

export default handleReviewAdded;
