import { tokenBlacklistModel } from "../models/blacklistTokenModel.js";
import { userModel } from "../models/userModel.js";

/**
 * @name registerUserController
 * @description register a new User, expects userName, email, password in the request body
 * @access Public
 */

async function registerUserController(req, res) {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    return res.status(400).json({
      message: "All Fields are Required!",
    });
  }

  const userAlreadyExist = await userModel.findOne({
    $or: [{ userName }, { email }],
  });

  if (userAlreadyExist) {
    return res.status(401).json({
      message: "User Already Register!",
    });
  }
  const user = await userModel.create({
    userName,
    email,
    password,
  });

  const token = await user.generateAccessToken();
  res.cookie("token", token);

  res.status(201).json({
    message: "User Register Successfully",
    user: {
      id: user._id,
      userName: user.userName,
      email: user.email,
    },
  });
}

/**
 * @name loginUserController
 * @description Login User, expects email and password in the request body
 * @access Public
 */

async function loginUserController(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and Password Both Required!",
    });
  }

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "User Not Found!" });
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    return res.status(400).json({ message: "Password is Wrong" });
  }

  const token = await user.generateAccessToken();

  res.cookie("token", token);

  return res.status(200).json({
    message: "user Login Successfully",
    user: {
      id: user._id,
      userName: user.userName,
      email: user.email,
    },
  });
}

/**
 * @name logoutUserController
 * @description clear token from user cookie and add the token in blacklist
 * @access Public
 */

async function logoutUserController(req, res) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(400).json({
      message: "User Already Logout!",
    });
  }

  if (token) {
    await tokenBlacklistModel.create({token});
  }

  res.clearCookie("token");

  return res.status(200).json({
    message: "User logged out Successfully",
  });
}

/**
 * @name logoutUserController
 * @description clear token from user cookie and add the token in blacklist
 * @access Public
 */
async function getMeController(req, res){
  const user = await userModel.findById(req.user.id);

  return res.status(200).json({
    message: "User Data Fetched Successfully",
    user:{
      id: user._id,
      userName: user.userName,
      email: user.email
    }
  })
}

export { registerUserController, loginUserController, logoutUserController, getMeController };
