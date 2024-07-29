import { userModel } from "../models/user.model.js";
import { generateToken } from "../utils/jwtFunction.js";
import { verifyPassword } from "../utils/hashFunctions.js";

class AuthController {
  async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Falta información",
      });
    }

    try {
      const user = await userModel.findOne({
        email,
      });

      if (!user) {
        return res.status(404).json({
          error: "Usuario no encontrado",
        });
      }

      const isPasswordCorrect = await verifyPassword(password, user.password);

      if (!isPasswordCorrect) {
        return res.status(401).json({
          error: "Contraseña incorrecta",
        });
      }

      const payload = {
        fullName: `${user.first_name} ${user.last_name}`,
        email: user.email,
        role: user.role,
      };

      const token = generateToken(payload);

      res.cookie("currentUser", token, {
        maxAge: 100000,
        httpOnly: true,
      });

      res.status(200).json({
        message: "Login exitoso",
      });
    } catch (error) {
      res.status(500).json({
        error: "Hubo un error",
        details: error.message,
      });
    }
  }
}

export default new AuthController();
