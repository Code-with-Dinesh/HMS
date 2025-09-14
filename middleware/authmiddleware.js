const ApiError = require("../utils/ApiError");
const asyncWraper = require("../utils/AsyncWrapper");
const jwt = require("jsonwebtoken");
const userSchema = require("../models/user.model");

const authmiddleware = asyncWraper(async (req, res, next) => {
  const token = req.cookies?.accessToken || req.headers.authorization?.replace("Bearer ", "").trim();
  if (!token) {
    throw new ApiError(401, "Unauthorized token is required");
  }

  const decode = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
  const user = await userSchema.findById(decode._id).select("-password");
  if (!user) {
    throw new ApiError(400, "User not Found");
  }
  req.user = user;
  next();
});

const adminauth = asyncWraper(async (req, res, next) => {
  if (req.user && req.user.role === "Admin") {
    next();
  } else {
    throw new ApiError(403, "Access Denied: for Admin only");
  }
});

module.exports = {
  authmiddleware,
  adminauth,
};
