import { Router } from "express";
import {
  getMeController,
  loginUserController,
  logoutUserController,
  registerUserController,
} from "../controllers/auth.controller.js";
import authUser from "../middlewares/auth.middleware.js";

const authRouter = Router();

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */
authRouter.post("/register", registerUserController);

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access public
 */
authRouter.post("/login", loginUserController);

/**
 * @route GET /api/auth/Logout
 * @description clear token from user cookie and add the token in blacklist
 * @access public
 */
authRouter.get("/logout", logoutUserController);

/**
 * @route GET /api/auth/get-me
 * @description get the current logged in user Details
 * @access protected
 */
authRouter.get("/get-me", authUser, getMeController)

export { authRouter };
