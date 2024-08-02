import { userModel } from "../models/user.model.js";
import { generateToken } from "../utils/jwtFunctions.js";

class AuthController {
  async login(req, res) {
    console.log(req.user); // Recibimos el usuario desde el middleware de passport

    const payload = {
      email: req.user.email,
      role: req.user.role,
    };

    const token = generateToken(payload);

    res.cookie("token", token, {
      maxAge: 1000 * 60 * 2, // 2 minutos
      httpOnly: true, // Solo se puede acceder a través de peticiones http
    });

    res.status(200).json({ message: "Login exitoso" });
  }

  async loginError(req, res) {
    res.status(401).json({ message: "Usuario o contraseña incorrecto" });
  }

  async register(req, res) {
    const { first_name, last_name, email, age, password, role } = req.body;

    if (!first_name || !last_name || !email || !age || !password) {
      return res.status(400).json({
        error: "Falta información",
      });
    }

    try {
      const userExists = await userModel.findOne({ email });

      if (userExists) {
        return res.status(400).json({
          error: "El usuario ya existe",
        });
      }

      const user = new userModel({
        first_name,
        last_name,
        email,
        age,
        password,
        role,
      });

      await user.save();

      res.status(201).json({ message: "Usuario creado" });
    } catch (error) {
      res.status(500).json({
        error: "Hubo un error",
        details: error.message,
      });
    }
  }

  async current(req, res) {
    console.log(req.user); // Recibimos el usuario desde el middleware de passport

    res.json({ message: "Usuario logueado", user: req.user });
  }

  async logout(req, res) {
    req.clearCookie("token");

    res.json({ message: "Sesión cerrada" });
  }
}

export default new AuthController();
