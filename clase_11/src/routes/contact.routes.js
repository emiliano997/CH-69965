import { Router } from "express";
import { contactController } from "../controllers/contact.controller.js";
import {
  transformContact,
  validate,
} from "../middlewares/validation.middleware.js";
import { contactDto } from "../dto/contact.dto.js";

const router = Router();

router.get("/", contactController.getAll);
router.get("/:id", contactController.getById);
router.post(
  "/",
  transformContact,
  validate(contactDto),
  contactController.create
);

export default router;
