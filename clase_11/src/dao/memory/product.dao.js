import { v4 as uuidv4 } from "uuid";

export class ProductDao {
  #products;

  constructor() {
    this.#products = [];
  }

  async getAll() {
    return this.#products;
  }

  async getById({ id }) {
    return this.#products.find((product) => product.id === id);
  }

  async create(product) {
    // product.id = this.#products.length
    //   ? this.#products[this.#products.length - 1].id + 1
    //   : 1;

    product.id = uuidv4(); // Generar un id aleatorio
    this.#products.push(product);
    return product;
  }
}
