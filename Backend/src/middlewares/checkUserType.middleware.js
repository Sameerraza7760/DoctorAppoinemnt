export const setUserTypeMiddleware = (req, res, next) => {
  const userType = req.headers["user-type"];
  req.userType = userType;
  next();
};
