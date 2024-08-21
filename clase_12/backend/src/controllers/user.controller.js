import { userService } from "../services/user.service.js";

class UserController {
  async getAll(req, res) {
    try {
      const users = await userService.getAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const user = await userService.getById({ id: req.params.id });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async create(req, res) {
    try {
      const newUser = await userService.create({ user: req.body });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      const updatedUser = await userService.update({ id, user: req.body });
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export const userController = new UserController();
