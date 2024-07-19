import { Request, Response } from "express";
import { User, userModel } from "../models/user.model";

class AuthController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await userModel.findOne({ email }).lean<User>();

      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      if (user.password !== password) {
        return res.status(401).json({ message: "Contraseña incorrecta" });
      }

      res.cookie("user", user.email, { maxAge: 100000, httpOnly: true });

      res.status(200).json({ message: "Sesión iniciada" });
    } catch (error: any) {
      res.status(500).json({ error: "Hubo un error", details: error.message });
    }
  }

  async register(req: Request, res: Response) {
    const { first_name, last_name, email, age, password } = req.body;

    try {
      const user = await userModel.create({
        first_name,
        last_name,
        email,
        age,
        password,
      });

      res.status(201).json({ message: "Usuario creado", user });
    } catch (error: any) {
      res.status(500).json({ error: "Hubo un error", details: error.message });
    }
  }

  current(req: Request, res: Response) {
    // Aca uso el id
    console.log(req.user?._id);

    res.json(req.user);
  }
}

export default new AuthController();
