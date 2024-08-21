import { orderModel } from "../models/order.model.js";

class OrderService {
  async getAll() {
    return await orderModel.find();
  }

  async getById({ id }) {
    return await orderModel.findById(id);
  }

  async create({ order }) {
    return await orderModel.create(order);
  }

  async update({ id, order }) {
    return await orderModel.findByIdAndUpdate(id, order);
  }

  async getOrderNumber() {
    return Number(Date.now() + Math.floor(Math.random() * 10000 + 1));
  }
}

export const orderService = new OrderService();
