import { compare } from "bcrypt";
import { TryCatch } from "../middleware/error.js";
import { User } from "../models/user.js";
import { sendToken, cookieOptions } from "../utils/features.js";
import { ErrorHandler } from "../utils/utility.js";

// Create a new user and save it to the database and save token in cookie
const newUser = TryCatch(async (req, res, next) => {
  const { name, username, password, bio } = req.body;

  // const file = req.file;

  // if (!file) return next(new ErrorHandler("Please Upload Avatar"));

  // const result = await uploadFilesToCloudinary([file]);
  const result = [
    {
      public_id:"23456786786786",
      url: "sxascsdvcdfvdfbfbb gff hb ",
    },
  ];
  const avatar = {
    public_id: result[0].public_id,
    url: result[0].url,
  };

  const user = await User.create({
    name,
    bio,
    username,
    password,
    avatar,
  });

  sendToken(res, user, 201, "User created");
});

const login = TryCatch(async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Username or Password", 404));
  }

  const isMatch = await compare(password, user.password);

  if (!isMatch) {
    return next(new ErrorHandler("Invalid Username or Password", 404));
  }

  sendToken(res, user, 200, `Welcome Back, ${user.username}`);
});
const logout = TryCatch(async (req, res) => {
  return res
    .status(200)
    .cookie("chatterBox-token", "", { ...cookieOptions, maxAge: 0 })
    .json({
      success: true,
      message: "Logged out successfully",
    });
});

export { login, newUser, logout };
