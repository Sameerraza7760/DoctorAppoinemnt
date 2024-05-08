const handleAppointmentStatusUpdated = (socket, io) => {
  socket.on("appointmentStatusUpdated", ({ id, status }) => {
    io.emit("appointmentStatusUpdated", { id, status });
  });
};

export default handleAppointmentStatusUpdated;
