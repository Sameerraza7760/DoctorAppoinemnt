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
  const { userType } = req;
  const UserModel = getUserModel(userType);

  // Extract common user properties
  const { fullName, email, gender, phoneNumber, address, password } = req.body;
  let userObject = { fullName, email, gender, phoneNumber, address, password };

  if (UserModel === Doctor) {
    const {
      specialization,
      startTiming,
      endTiming,
      experience,
      qualifications,
      feesPerConsultation,
    } = req.body;
    userObject = {
      ...userObject,
      specialization,
      experience,
      qualifications,
      feesPerConsultation,
      startTiming,
      endTiming,
    };
  } else if (UserModel === Patient) {
    const { maritalStatus } = req.body;
    userObject = { ...userObject, maritalStatus };
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

  if (!username && !email) {
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

const refreshAccessToken = asyncHandler(async (req, res) => {
  try {
    const inComingRefreshToken =
      req.cookies.refreshToken || req.body.refreshToken;
    if (!inComingRefreshToken) {
      throw new ApiError(401, "unAuthrized request");
    }
    const decodedToken = jwt.verify(
      inComingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    const user = await User.findById(decodedToken?._id);
    if (!user) {
      throw new ApiError(401, "Invalid Refresh Token");
    }
    if (inComingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "RefreshToken is Expired or Used");
    }
    const options = { httpOnly: true, secure: true };
    const { accessToken, refreshToken } =
      await generateAccsessAndRefereshTokens(user._id);
    return res
      .status(200)
      .clearCookie("accessToken", accessToken, options)
      .clearCookie("refreshToken", refreshToken, options)
      .json(new ApiResponce(200, { accessToken, refreshToken }));
  } catch (error) {
    throw new ApiError(401, error?.message);
  }
});

export { registerUser, loginUser, logoutUser };
