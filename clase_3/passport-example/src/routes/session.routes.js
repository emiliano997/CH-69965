import { Router } from "express";
import { userModel } from "../models/user.model.js";
import { createHash, verifyPassword } from "../utils/hashFunctions.js";
import passport from "passport";

const router = Router();

// Login route
router.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/api/sessions/login-fail",
  }),
  async (req, res) => {
    console.log(req.user);

    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      email: req.user.email,
      age: req.user.age,
    };

    res.json({ message: "Sesión iniciada" });
  }
);

router.get("/login-fail", (req, res) => {
  res.json({ message: "Hubo un error" });
});

// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: "Todos los campos son requeridos" });
//   }

//   try {
//     const user = await userModel.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ message: "Usuario no encontrado" });
//     }

//     // if (user.password !== password) {
//     //   return res.status(401).json({ message: "Contraseña incorrecta" });
//     // }

//     const isPasswordCorrect = await verifyPassword(password, user.password);

//     if (!isPasswordCorrect) {
//       return res.status(401).json({ message: "Contraseña incorrecta" });
//     }

//     req.session.user = {
//       first_name: user.first_name,
//       last_name: user.last_name,
//       email: user.email,
//       age: user.age,
//     };

//     // return res.status(200).json({ message: "Sesión iniciada" });
//     res.redirect("/profile");
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ error: "Hubo un error", details: error.message });
//   }
// });

// Register route
router.post(
  "/register",
  passport.authenticate("register", {
    failureRedirect: "/api/sessions/register-fail",
  }),
  async (req, res) => {
    res.json({ message: "Usuario creado" });
  }
);

router.get("/register-fail", (req, res) => {
  res.json({ message: "Hubo un error" });
});

// router.post("/register", async (req, res) => {
//   const { first_name, last_name, email, age, password } = req.body;

//   if (!first_name || !last_name || !email || !age || !password) {
//     return res.status(400).json({ message: "Todos los campos son requeridos" });
//   }

//   try {
//     const hashPassword = await createHash(password);

//     const user = await userModel.create({
//       first_name,
//       last_name,
//       email,
//       age,
//       password: hashPassword,
//     });

//     // return res.status(201).json({ message: "Usuario creado", user });
//     res.redirect("/login");
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ error: "Hubo un error", details: error.message });
//   }
// });

router.post("/restore-password", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Todos los campos son requeridos" });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const hashPassword = await createHash(password);

    await userModel.findOneAndUpdate(
      {
        email: user.email,
      },
      {
        password: hashPassword,
      }
    );

    res.redirect("/login");
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Hubo un error", details: error.message });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

export default router;
