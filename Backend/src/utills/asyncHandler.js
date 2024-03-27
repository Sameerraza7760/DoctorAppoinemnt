const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
    // try {
    //   // Don't use return here if you want to handle the response in the route handler
    //   await requestHandler(req, res, next);

    // } catch (error) {
    //   res
    //     .status(error.code || 500)
    //     .json({ success: false, message: error.message });
    // }
  };
};

export { asyncHandler };
