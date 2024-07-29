import { Router } from "express";
import userController from "../controllers/user.controller.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", authenticate, authorize(["admin"]), userController.getAll);
router.get("/:id", userController.getById);
router.post("/", userController.create);
router.delete("/:id", userController.delete);

export default router;
