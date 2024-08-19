import { productRepository } from "../repository/index.js";

class ProductController {
  async getAll(req, res) {
    try {
      const products = await productRepository.getAll();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({
        message: "Hubo un error",
        details: error.message,
      });
    }
  }

  async getById(req, res) {
    const { id } = req.params;

    try {
      const product = await productRepository.getById({ id });
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({
        message: "Hubo un error",
        details: error.message,
      });
    }
  }

  async create(req, res) {
    const product = req.body;

    try {
      const newProduct = await productRepository.create({
        name: product.name,
        price: product.price,
        stock: product.stock,
      });
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({
        message: "Hubo un error",
        details: error.message,
      });
    }
  }
}

export const productController = new ProductController();
