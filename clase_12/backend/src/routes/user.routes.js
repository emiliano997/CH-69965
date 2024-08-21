import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { validate } from "../middleware/validation.middleware.js";
import { userDto } from "../dto/user.dto.js";

const router = Router();

router.get("/", userController.getAll);
router.get("/:id", userController.getById);
router.post("/", validate(userDto), userController.create);
router.put("/:id", userController.update);

export default router;
