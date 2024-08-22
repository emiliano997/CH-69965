import { userModel } from "../models/user.model.js";

export class UserController {
  static async getAll(req, res) {
    try {
      const users = await userModel.find();
      res.json(users);
    } catch (error) {
      res
        .status(500)
        .json({
          error: "Error al obtener los usuarios",
          details: error.message,
        });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const user = await userModel.findById(id);
      res.json(user);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error al obtener el usuario", details: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const user = await userModel.findByIdAndDelete(id);
      res.json(user);
    } catch (error) {
      res.status(500).json({
        error: "Error al eliminar el usuario",
        details: error.message,
      });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const { first_name, last_name, email, age, password } = req.body;

      const user = await userModel.findByIdAndUpdate(id, {
        first_name,
        last_name,
        email,
        age,
        password,
      });

      res.json(user);
    } catch (error) {
      res.status(500).json({
        error: "Error al actualizar el usuario",
        details: error.message,
      });
    }
  }
}
