import { error } from "console";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { existsSync } from "fs";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import { ApiResponse } from "../utils/Apiresponse.js";
import jwt from "jsonwebtoken";
// /api/v1/users/register

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    console.log(user);

    user.refreshToken = refreshToken;
    user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and refresh token"
    );
  }
};
// /api/v1/users/register
const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, username, password } = req.body;
  console.log(req.body);

  if (
    [fullname, email, username, password].some((field) => {
      return field?.trim() === "";
    })
  ) {
    throw new ApiError(400, "Full name is required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    return res
      .status(409)
      .json(new ApiError(409, "User with email or username already existed"));
  }
  // here req.files is provided by multer
  const avatarLocalPath = await req.files?.avatar[0]?.path;

  // create avatar url by uploading it on cloudinary
  if (avatarLocalPath) {
    const avatarUrl = await uploadOnCloudinary(avatarLocalPath);
  }

  // user created
  User.create({
    fullName: fullname,
    email: email,
    password: password,
    userName: username.toLowerCase(),
  });

  // response to user
  return res
    .status(201)
    .json(new ApiResponse(200, "User created Successfully"));
});
// /api/v1/users/login
const loginUser = asyncHandler(async (req, res) => {
  // get username password from user
  // check wheter the user is in db or not
  // check if the password is valid
  // return access token and refresh token
  const { usernameEmail, password } = req.body;
  console.log(req.body);


  const userName = usernameEmail;
  const email = usernameEmail;

  if (!usernameEmail) {
    return res.status(400).json(new ApiError(400, "username or email is required"));
  }

  const existedUser = await User.findOne({
    $or: [{ userName }, { email }],
  });

  if (!existedUser) {
    return res.status(400).json(new ApiError(400, "User does not exist"));
  }

  const validPassword = await existedUser.isPasswordCorrect(password);

  if (!validPassword) {
    throw new ApiError(400, "Invalid User credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    existedUser._id
  );

  const updatedUser = await User.findById(existedUser._id).select(
    "-password -refreshToken"
  );
  console.log(updatedUser);

  return res
    .status(200)
    .cookie("accessToken", accessToken, { httpOnly: true })
    .cookie("refreshToken", refreshToken, { httpOnly: true })
    .json(
      new ApiResponse(200, {
        user: updatedUser,
        accessToken: accessToken,
        refreshToken: refreshToken,
      })
    );
});
// /api/v1/users/logout
const logoutUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  user.refreshToken = undefined;
  await user.save();
  const options = {
    httpOnly: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, "Logout Successfull"));
});
// /api/v1/users//refresh-access-token
const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    const decodedRefreshToken = await jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedRefreshToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh Token");
    }

    if (user.refreshToken !== incomingRefreshToken) {
      throw new ApiError(401, "Refresh token is exired or used");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );

    const options = {
      httpOnly: true,
    };
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(200, {
          accessToken: accessToken,
        })
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh Token");
  }
});

export { registerUser, loginUser, logoutUser, refreshAccessToken };
