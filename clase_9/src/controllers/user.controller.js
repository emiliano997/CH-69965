import { userService } from "../services/index.js";

class UserController {
  async getAll(req, res) {
    try {
      const users = await userService.getAll();
      res.status(200).json(users);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Hubo un error", details: error.message });
    }
  }

  async getById(req, res) {
    const { id } = req.params;

    try {
      const user = await userService.getById(id);

      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      res.status(200).json(user);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Hubo un error", details: error.message });
    }
  }

  async create(req, res) {
    const { name, email, age } = req.body;

    if (!name || !email || !age) {
      return res.status(400).json({
        message: "Todos los campos son requeridos",
      });
    }

    try {
      const user = await userService.create({
        name,
        email,
        age,
      });

      res.status(201).json(user);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Hubo un error", details: error.message });
    }
  }
}

export const userController = new UserController();
