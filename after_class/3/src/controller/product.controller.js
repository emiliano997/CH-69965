import { productModel } from "../models/product.model.js";

export class ProductController {
  static async getAll(req, res) {
    try {
      const products = await productModel.find();
      res.json(products);
    } catch (error) {
      res.status(500).json({
        error: "Error al obtener los productos",
        details: error.message,
      });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const product = await productModel.findById(id);
      res.json(product);
    } catch (error) {
      res.status(500).json({
        error: "Error al obtener el producto",
        details: error.message,
      });
    }
  }

  static async create(req, res) {
    try {
      const { name, description, price, image, stock } = req.body;

      const product = await productModel.create({
        name,
        description,
        price,
        image,
        stock,
      });

      res.status(201).json(product);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error al crear el producto", details: error.message });
    }
  }
}
