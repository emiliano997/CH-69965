import { cartModel } from "../models/cart.model.js";

export class CartService {
  static async getById(id) {
    return await userModel.findById(id);
  }

  static async create(cart) {
    return await cartModel.create(cart);
  }
}
