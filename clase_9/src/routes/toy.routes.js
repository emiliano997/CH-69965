import { Router } from "express";
import { toyController } from "../controllers/toy.controller.js";
import { param } from "express-validator";

const router = Router();

router.get("/", toyController.getAll);
router.get("/:id", param("id").isMongoId().notEmpty(), toyController.getById);
router.post("/", toyController.create);

export default router;
