import { asyncHandler } from "../utills/asyncHandler.js";
import { Doctor } from "../models/doctor.models.js";
import { ApiError } from "../utills/ApiError.js";
import { ApiResponce } from "../utills/ApiResponce.js";
import { Patient } from "../models/patient.models.js";
import { getUserModel } from "../utills/getUserModel.js";
const generateAccsessAndRefereshTokens = async (userId, UserModel) => {
  try {
    const user = await UserModel.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};
const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, gender, phoneNumber, address, password } = req.body;

  const { userType } = req;
  const UserModel = getUserModel(userType);

  let userObject;
  if (UserModel === Doctor) {
    const { specialization } = req.body;
    userObject = {
      fullName,
      email,
      gender,
      phoneNumber,
      address,
      password,
      specialization,
    };
  } else if (UserModel === Patient) {
    const { maritalStatus } = req.body;
    userObject = {
      fullName,
      email,
      gender,
      phoneNumber,
      address,
      password,
      maritalStatus,
    };
  }

  const existedUser = await UserModel.findOne({ email });
  if (existedUser) {
    throw new ApiError(409, "User with email already exists");
  }

  const user = await UserModel.create(userObject);

  res.status(201).json({
    status: 201,
    data: user,
    message: "User registered successfully",
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;
  console.log(email);

  if (!username && !email) {
    throw new ApiError(400, "username or email is required");
  }

  if (!email) {
    throw new ApiError(400, "username or email is required");
  }

  const userType = req.userType;
  const UserModel = getUserModel(userType);
  const user = await UserModel.findOne({
    $or: [{ email }],
  });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccsessAndRefereshTokens(
    user._id,
    UserModel
  );

  const loggedInUser = await UserModel.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };
  res.cookie("accessToken", accessToken, options);
  res.cookie("refreshToken", refreshToken, options);
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({
      status: 200,
      data: { user: loggedInUser, accessToken, refreshToken },
      message: "User logged in successfully",
    });
});

const logoutUser = asyncHandler(async (req, res) => {
  const UserModel = getUserModel(req.userType);

  await UserModel.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1, 
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponce(200, {}, "User logged Out"));
});
export { registerUser, loginUser, logoutUser };
