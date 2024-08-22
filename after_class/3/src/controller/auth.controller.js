import { generateToken } from "../utils/jwt.js";

export class AuthController {
  static async login(req, res) {
    try {
      const payload = {
        email: req.user.email,
        role: req.user.role,
      };

      const token = generateToken(payload);

      res.cookie("token", token, {
        maxAge: 100000,
        httpOnly: true,
      });

      res.status(200).json({
        message: "Sesión iniciada",
        token,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error al iniciar sesión", details: error.message });
    }
  }

  static async register(req, res) {
    try {
      res.status(201).json({
        message: "Usuario registrado",
        user: req.user,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error al registrar", details: error.message });
    }
  }

  static async current(req, res) {
    try {
      res.json(req.user);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error al obtener el usuario", details: error.message });
    }
  }
}
