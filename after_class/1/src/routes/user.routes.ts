import { Router } from "express";
import userController from "../controllers/user.controller";
import { authentication } from "../middlewares/authentication";

const router = Router();

router.get("/", authentication, userController.getAll);

export default router;
