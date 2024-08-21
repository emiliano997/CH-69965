import { Router } from "express";
import { businessController } from "../controllers/business.controller.js";
import { validate } from "../middleware/validation.middleware.js";
import { businessDto } from "../dto/business.dto.js";

const router = Router();

router.get("/", businessController.getAll);
router.get("/:id", businessController.getById);
router.post("/", validate(businessDto), businessController.create);
router.put("/:id", businessController.update);

export default router;
