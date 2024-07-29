import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", (req, res) => {
  if (!req.cookies.currentUser) {
    res.render("login");
  } else {
    res.redirect("/current");
  }
});

router.get("/current", authenticate, (req, res) => {
  if (req.user) {
    res.render("current", { user: req.user });
  } else {
    res.redirect("/");
  }
});

export default router;
