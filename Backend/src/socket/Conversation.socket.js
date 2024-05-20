const handleSendMessege = (socket, io) => {
  socket.on("messegeSent", (data) => {
    io.emit("messegeRecieved", data);
  });
};

export default handleSendMessege;
