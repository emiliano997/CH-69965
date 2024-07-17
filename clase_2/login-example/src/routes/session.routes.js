import { Router } from "express";
import { userModel } from "../models/user.model.js";

const router = Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Todos los campos son requeridos" });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    req.session.user = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      age: user.age,
    };

    // return res.status(200).json({ message: "Sesión iniciada" });
    res.redirect("/profile");
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Hubo un error", details: error.message });
  }
});

router.post("/register", async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;

  if (!first_name || !last_name || !email || !age || !password) {
    return res.status(400).json({ message: "Todos los campos son requeridos" });
  }

  try {
    const user = await userModel.create({
      first_name,
      last_name,
      email,
      age,
      password,
    });

    // return res.status(201).json({ message: "Usuario creado", user });
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
