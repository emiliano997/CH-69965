import { Router } from "express";
import passport from "passport";

const router = Router();

router.get("/github", passport.authenticate("github"));

router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    console.log(req.user);

    if (req.user) {
      req.session.user = req.user;
      return res.redirect("/");
    }

    res.redirect("/login");
  }
);

export default router;