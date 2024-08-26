import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";

const router = Router();

router.get("/", UserController.getAll);
router.post("/", UserController.create);
router.get("/activate/:code", UserController.activate);

export default router;
