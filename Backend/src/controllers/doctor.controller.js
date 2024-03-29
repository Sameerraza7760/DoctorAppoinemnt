import { asyncHandler } from "../utills/asyncHandler.js";
import { Doctor } from "../models/doctor.models.js";
import { ApiError } from "../utills/ApiError.js";
import { ApiResponce } from "../utills/ApiResponce.js";
const checkExistingUser = async (model) => {
  return await model.findOne({ $or: [{ email }] });
};
const generateAccsessAndRefereshTokens = async (userId) => {
  try {
    const user = await Doctor.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false }); // Await the save operation
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};
const registerDoctor = asyncHandler(async (req, res) => {
  const {
    fullName,
    email,
    gender,
    phoneNumber,
    address,
    password,
    specialization,
  } = req.body;

  const existedUser = await Doctor.findOne({ $or: [{ email }] });
  if (existedUser) {
    throw new ApiError(409, "User with email or username alrady exists");
  }
  const doctor = await Doctor.create({
    fullName: fullName.toLowerCase(),
    email,
    gender,
    phoneNumber,
    address,
    password,
    specialization,
  });

  const createdDoctor = await Doctor.findById(doctor._id).select(
    "-password -refreshToken"
  );
  if (!createdDoctor) {
    throw new ApiError(500, "Something went wrong while regestring the user");
  }
  return res
    .status(201)
    .json(new ApiResponce(200, createdDoctor, "User regestered Sussesfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  // req body -> data
  // username or email
  //find the user
  //password check
  //access and referesh token
  //send cookie

  const { email, username, password } = req.body;
  console.log(email);

  if (!username && !email) {
    throw new ApiError(400, "username or email is required");
  }

  // Here is an alternative of above code based on logic discussed in video:
  if (!email) {
    throw new ApiError(400, "username or email is required");
  }

  const userType = req.userType;
   let UserModel;
  if (userType === 'doctor') {
    UserModel = Doctor;
  } else if (userType === 'patient') {
    UserModel = Patient;
  }
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
    user._id
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
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1, // this removes the field from document
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

export { registerDoctor, loginUser, logoutUser };
