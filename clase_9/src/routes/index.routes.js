import { Router } from "express";
import userRouter from "./user.routes.js";
import toyRouter from "./toy.routes.js";

const router = Router();

router.use("/users", userRouter);
router.use("/toys", toyRouter);

export default router;
