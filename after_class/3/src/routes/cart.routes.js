import { Router } from "express";
import { cartModel } from "../models/cart.model.js";
import { productModel } from "../models/product.model.js";
import { validate } from "../middlewares/validation.middleware.js";
import { cartDto } from "../dtos/cart.dto.js";
import { uuid } from "uuidv4";
import { CartController } from "../controller/cart.controller.js";

const router = Router();

router.get("/:id", CartController.getById);
router.post("/", validate(cartDto), CartController.create);

router.post("/:id/products", CartController.addProduct);

router.delete("/:id", CartController.delete);

router.delete("/:id/products/:productId", CartController.deleteProduct);

router.delete("/:id/products", CartController.deleteAllProducts);

// Entrega final
router.post("/:id/purchase", CartController.purchase);

export default router;
