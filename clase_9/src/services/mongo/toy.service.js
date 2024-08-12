import { toyModel } from "../../models/toy.model.js";

// export const getToys = async () => {
//   const toys = await toyModel.find();
//   return toys;
// };

export class ToyService {
  async getAll() {
    return await toyModel.find();
  }

  async getById(id) {
    return await toyModel.findById(id);
  }

  async create(toy) {
    return await toyModel.create(toy);
  }
}

// export default new ToyService();
// export const toyService = new ToyService();
