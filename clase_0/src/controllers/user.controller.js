import userService from "../services/user.service.js";

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
      const { id } = req.params;

      const user = await userService.getById(id);

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
      const { name, age, email } = req.body;

      if (!name || !age || !email) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const userExists = await userService.getByEmail(email);

      if (userExists) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const user = await userService.create({ name, age, email });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // TODO - Update user

  // TODO - Delete user
}

export default new UserController();
