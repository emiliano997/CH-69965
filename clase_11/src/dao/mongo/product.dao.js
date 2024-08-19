import { productModel } from "../../models/product.model.js";

export class ProductDao {
  async getAll() {
    return await productModel.find();
  }

  async getById({ id }) {
    return await productModel.findById(id);
  }

  async create(product) {
    return await productModel.create(product);
  }
}
