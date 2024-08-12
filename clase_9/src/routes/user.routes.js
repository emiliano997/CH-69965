import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { param } from "express-validator";

const router = Router();

router.get("/", userController.getAll);
router.get("/:id", param("id").isMongoId().notEmpty(), userController.getById);
router.post("/", userController.create);

export default router;
