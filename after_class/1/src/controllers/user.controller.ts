import { Request, Response } from "express";
import { User, userModel } from "../models/user.model";

class UserController {
  async getAll(req: Request, res: Response) {
    console.log(req.user?.first_name);

    try {
      const users = await userModel.find().lean<User>();

      res.status(200).json(users);
    } catch (error: any) {
      res.status(500).json({ error: "Hubo un error", details: error.message });
    }
  }
}

export default new UserController();
