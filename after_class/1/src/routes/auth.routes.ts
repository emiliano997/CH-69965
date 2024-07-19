import { Router } from "express";
import authController from "../controllers/auth.controller";
import { authentication } from "../middlewares/authentication";

const router = Router();

router.post("/login", authController.login);
router.post("/register", authController.register);
router.get("/current", authentication, authController.current);

export default router;
