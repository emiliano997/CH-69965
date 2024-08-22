import { Router } from "express";
import { validate } from "../middlewares/validation.middleware.js";
import { productDto } from "../dtos/product.dto.js";
import {
  authenticate,
  authorizations,
} from "../middlewares/authorization.middleware.js";
import { ProductController } from "../controller/product.controller.js";

const router = Router();

router.get("/", ProductController.getAll);

router.get("/:id", ProductController.getById);

router.post(
  "/",
  authenticate("jwt"),
  authorizations(["admin"]),
  validate(productDto),
  ProductController.create
);

export default router;
