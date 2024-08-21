import { Router } from "express";
import { orderController } from "../controllers/order.controller.js";
import { validate } from "../middleware/validation.middleware.js";
import { orderDto } from "../dto/order.dto.js";

const router = Router();

router.get("/", orderController.getAll);
router.get("/:id", orderController.getById);
router.post("/", validate(orderDto), orderController.create);
router.put("/:id/resolve", orderController.resolve);

export default router;
