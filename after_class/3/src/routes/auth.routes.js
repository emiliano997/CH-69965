import { Router } from "express";
import { userModel } from "../models/user.model.js";
import { validate } from "../middlewares/validation.middleware.js";
import { authDto } from "../dtos/auth.dto.js";
import { generateToken } from "../utils/jwt.js";
import passport from "passport";
import { userDto } from "../dtos/user.dto.js";
import { AuthController } from "../controller/auth.controller.js";
import { authenticate } from "../middlewares/authorization.middleware.js";

const router = Router();

router.post(
  "/login",
  validate(authDto),
  authenticate("login"),
  AuthController.login
);

router.post(
  "/register",
  validate(userDto),
  authenticate("register"),
  AuthController.register
);

router.get("/current", authenticate("jwt"), AuthController.current);

export default router;
