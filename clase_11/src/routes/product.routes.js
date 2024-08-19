import { Router } from "express";
import { productController } from "../controllers/product.controller.js";
import { validate } from "../middlewares/validation.middleware.js";
import { productDto } from "../dto/product.dto.js";

const router = Router();

router.get("/", productController.getAll);
router.get("/:id", productController.getById);
router.post("/", validate(productDto), productController.create);

export default router;
