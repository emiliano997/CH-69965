import { v4 as uuid } from "uuid";
import { cartModel } from "../models/cart.model.js";
import { productModel } from "../models/product.model.js";
import { ProductsService } from "../services/products.service.js";
import { ticketModel } from "../models/ticket.model.js";

export class CartController {
  static async getById(req, res) {
    try {
      const { id } = req.params;
      const cart = await cartModel.findById(id);

      if (!cart) {
        return res.status(404).json({
          error: "No se encontró el carrito",
        });
      }

      res.json(cart);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error al obtener el carrito", details: error.message });
    }
  }

  static async create(req, res) {
    try {
      const { products } = req.body;
      const cart = await cartModel.create({ products });

      res.status(201).json(cart);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error al crear el carrito", details: error.message });
    }
  }

  static async addProduct(req, res) {
    try {
      const { productId, quantity } = req.body;

      const productExists = await productModel.findById(productId);

      if (!productExists) {
        return res.status(404).json({
          error: "Producto no encontrado",
        });
      }

      const cart = await cartModel.findById(req.params.id);

      if (!cart) {
        return res.status(404).json({
          error: "No se encontró el carrito",
        });
      }

      const isProductInCart = cart.products.find((p) => {
        console.log(p);
        return p.product._id.toString() === productId;
      });

      if (isProductInCart) {
        // Aumentar la cantidad de productos en el carrito
        cart.products.find((p) => {
          console.log(p);
          return p.product._id.toString() === productId;
        }).quantity += quantity;

        cart.save();

        return res.json(cart);
      } else {
        cart.products.push({
          product: productId,
          quantity,
        });

        cart.save();

        return res.json(cart);
      }
    } catch (error) {
      res.status(500).json({
        error: "Error al agregar producto al carrito",
        details: error.message,
      });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const cart = await cartModel.findByIdAndDelete(id);

      res.json(cart);
    } catch (error) {
      res.status(500).json({
        error: "Error al eliminar el carrito",
        details: error.message,
      });
    }
  }

  static async deleteProduct(req, res) {
    try {
      const { id, productId } = req.params;
      const cart = await cartModel.findById(id);

      const isProductInCart = cart.products.find(
        (p) => p.product === productId
      );

      if (isProductInCart) {
        cart.products = cart.products.filter((p) => p.product !== productId);
        cart.save();

        res.json(cart);
      } else {
        return res.status(404).json({
          error: "Producto no encontrado",
        });
      }
    } catch (error) {
      res.status(500).json({
        error: "Error al eliminar el producto del carrito",
        details: error.message,
      });
    }
  }

  static async deleteAllProducts(req, res) {
    try {
      const { id } = req.params;
      const cart = await cartModel.findById(id);

      cart.products = [];
      cart.save();

      res.json(cart);
    } catch (error) {
      res.status(500).json({
        error: "Error al eliminar todos los productos del carrito",
        details: error.message,
      });
    }
  }

  // Entrega final
  static async purchase(req, res) {
    try {
      const { id } = req.params;

      const cart = await cartModel.findById(id).populate("products.product");

      if (!cart) {
        return res.status(404).json({
          error: "No se encontró el carrito",
        });
      }

      // Validar que la cantidad de productos dentro del carrito sea menor o igual al stock del producto
      const productsWithoutStock = [];

      cart.products.forEach((p) => {
        if (p.product?.stock < p.quantity) {
          productsWithoutStock.push({
            productId: p.product._id,
            productName: p.product.name,
            quantity: p.quantity,
            stock: p.product.stock,
          });
        }
      });

      if (productsWithoutStock.length > 0) {
        return res.status(400).json({
          error: "No hay productos suficientes",
          details: productsWithoutStock,
        });
      }

      // Descontar stock del producto
      const promises = cart.products.map((p) => {
        return ProductsService.discountStock(p.product._id, p.quantity);
      });

      await Promise.all(promises);

      const amount = cart.products.reduce(
        (acc, curr) => acc + curr.quantity * curr.product.price,
        0
      );

      // Crear ticket
      const ticket = await ticketModel.create({
        code: uuid(),
        purchase_datetime: new Date(),
        amount,
        purchaser: req.user._id,
      });

      res.status(200).json({
        message: "Compra finalizada",
        ticket,
      });
    } catch (error) {
      res.status(500).json({
        error: "Error al finalizar la compra",
        details: error.message,
      });
    }
  }
}
