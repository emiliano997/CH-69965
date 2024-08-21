import { Router } from "express";
import userRoutes from "./user.routes.js";
import businessRoutes from "./business.routes.js";
import orderRoutes from "./order.routes.js";

const router = Router();

router.use("/users", userRoutes);
router.use("/business", businessRoutes);
router.use("/orders", orderRoutes);

export default router;
