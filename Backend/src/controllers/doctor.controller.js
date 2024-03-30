import { asyncHandler } from "../utills/asyncHandler.js";
import { Doctor } from "../models/doctor.models.js";
import { ApiError } from "../utills/ApiError.js";
import { ApiResponce } from "../utills/ApiResponce.js";
import { Patient } from "../models/patient.models.js";
const checkExistingUser = async (model) => {
  return await model.findOne({ $or: [{ email }] });
};
const generateAccsessAndRefereshTokens = async (userId, UserModel) => {
  try {
    const user = await UserModel.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false }); // Await the save operation
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};
const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, gender, phoneNumber, address, password } = req.body;

  // Extract userType from the request object
  const { userType } = req;

  // Define UserModel based on userType
  let UserModel;
  let userObject;

  if (userType === "doctor") {
    // If the user is a doctor, extract specialization from the request body
    const { specialization } = req.body;

    // Set UserModel to Doctor and construct userObject with specialization
    UserModel = Doctor;
    userObject = {
      fullName: fullName.toLowerCase(),
      email,
      gender,
      phoneNumber,
      address,
      password,
      specialization, // Add specialization to the user object
    };
  } else if (userType === "patient") {
    // If the user is a patient, extract maritalStatus from the request body
    const { maritalStatus } = req.body;

    // Set UserModel to Patient and construct userObject with maritalStatus
    UserModel = Patient;
    userObject = {
      fullName: fullName.toLowerCase(),
      email,
      gender,
      phoneNumber,
      address,
      password,
      maritalStatus,
    };
  }

  // Check if a user with the same email exists
  const existedUser = await UserModel.findOne({ email });
  if (existedUser) {
    throw new ApiError(409, "User with email already exists");
  }

  // Create a new user with the constructed userObject
  const user = await UserModel.create(userObject);

  // Return the created user
  res.status(201).json({
    status: 201,
    data: user,
    message: "User registered successfully",
  });
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
  if (userType === "doctor") {
    UserModel = Doctor;
  } else if (userType === "patient") {
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

export { registerUser, loginUser, logoutUser };
