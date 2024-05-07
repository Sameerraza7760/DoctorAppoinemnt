const handleReviewAdded = (socket, io) => {
    socket.on("reviewAdded", (formData) => {
      console.log("New review added:", formData);
      io.emit("reviewsFetched", { savedReview: formData });
    });
  };
  
  export default handleReviewAdded;