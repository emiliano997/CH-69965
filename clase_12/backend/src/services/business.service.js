import { businessModel } from "../models/business.model.js";

class BusinessService {
  async getAll() {
    return await businessModel.find();
  }

  async getById({ id }) {
    return await businessModel.findById(id);
  }

  async create({ business }) {
    return await businessModel.create(business);
  }

  async update({ id, business }) {
    return await businessModel.findByIdAndUpdate(id, business);
  }
}

export const businessService = new BusinessService();
