import { userModel } from "../../models/user.model.js";

export class UserService {
  async getAll() {
    return await userModel.find();
  }

  async getById(id) {
    return await userModel.findById(id);
  }

  async create(user) {
    return await userModel.create(user);
  }
}

// export const userService = new UserService();
