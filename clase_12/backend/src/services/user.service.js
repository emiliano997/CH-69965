import { userModel } from "../models/user.model.js";

class UserService {
  async getAll() {
    return await userModel.find();
  }

  async getById({ id }) {
    return await userModel.findById(id);
  }

  async create({ user }) {
    return await userModel.create(user);
  }

  async update({ id, user }) {
    return await userModel.findByIdAndUpdate(id, user);
  }
}

export const userService = new UserService();
