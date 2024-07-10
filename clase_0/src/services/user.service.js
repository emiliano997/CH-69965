import { userModel } from "../models/user.model.js";

class UserService {
  async getAll() {
    return await userModel.find();
  }

  async getById(id) {
    return await userModel.findById(id);
  }

  async getByEmail(email) {
    return await userModel.findOne({ email });
  }

  async create(user) {
    return await userModel.create(user);
  }

  // TODO - Update user

  // TODO - Delete user
}

// const userService = new UserService();
// export { userService };

export default new UserService();
