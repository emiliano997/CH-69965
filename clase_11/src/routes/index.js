import { Router } from "express";
import contactRoutes from "./contact.routes.js";
import productsRoutes from "./product.routes.js";

const router = Router();

router.use("/contacts", contactRoutes);
router.use("/products", productsRoutes);

export default router;
