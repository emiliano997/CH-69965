import { userModel } from "../models/user.model.js";

class UserController {
  async getAll(req, res) {
    try {
      const users = await userModel.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({
        error: "Hubo un error",
        details: error.message,
      });
    }
  }

  async getById(req, res) {
    const { id } = req.params;

    try {
      const user = await userModel.findById(id);

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({
        error: "Hubo un error",
        details: error.message,
      });
    }
  }

  async create(req, res) {
    const { first_name, last_name, email, role, password } = req.body;

    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({
        error: "Falta información",
      });
    }

    try {
      const user = new userModel({
        first_name,
        last_name,
        email,
        role,
        password,
      });

      // Con save tenes la ventaja de que podes usar los middlewares de mongoose
      await user.save();

      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({
        error: "Hubo un error",
        details: error.message,
      });
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      const user = await userModel.findByIdAndDelete(id);

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({
        error: "Hubo un error",
        details: error.message,
      });
    }
  }
}

export default new UserController();
