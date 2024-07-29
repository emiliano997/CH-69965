import { Router } from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import viewsRoutes from "./views.routes.js";

const router = Router();

router.use("/users", userRoutes);
router.use("/auth", authRoutes);

export default router;
