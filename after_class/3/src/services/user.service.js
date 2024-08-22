import { userModel } from "../models/user.model.js";

export class UserService {
  static async getAll() {
    return await userModel.find();
  }

  static async getById(id) {
    return await userModel.findById(id);
  }

  static async create(user) {
    return await userModel.create(user);
  }
}
