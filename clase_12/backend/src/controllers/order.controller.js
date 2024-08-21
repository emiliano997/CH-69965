import { orderService } from "../services/order.service.js";
import { userService } from "../services/user.service.js";
import { businessService } from "../services/business.service.js";

class OrderController {
  async getAll(req, res) {
    try {
      const { filter } = req.query;

      const orders = await orderService.getAll();

      if (filter === "completed") {
        return res
          .status(200)
          .json(orders.filter((order) => order.status === "completed"));
      }

      res.status(200).json(
        orders.map((order) => {
          console.log(order.business.products);

          return order;
        })
      );
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const order = await orderService.getById({ id });

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async create(req, res) {
    try {
      const {
        user: userId,
        business: businessId,
        products: productsIds,
      } = req.body;

      console.log(req.body);

      if (!userId || !businessId || !productsIds) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // Get user and business from database
      const user = await userService.getById({ id: userId });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const business = await businessService.getById({ id: businessId });

      if (!business) {
        return res.status(404).json({ message: "Business not found" });
      }

      const productsNotFound = [];

      // Verificamos que los productos esten en la lista de productos de la empresa
      const products = business.products.filter((product) => {
        // if (
        //   business.products.some(
        //     (product) =>
        //   )
        // ) {
        //   productsNotFound.push(product._id.toString());
        // }
        return productsIds.includes(product._id.toString());
      });

      if (products.length !== productsIds.length) {
        return res.status(400).json({
          message: "Some products are not in the business",
          productsNotFound,
        });
      }

      const totalPrice = products.reduce(
        (acc, product) => acc + product.price,
        0
      );

      const orderNumber = await orderService.getOrderNumber();

      // Creamos la nueva orden
      const newOrder = await orderService.create({
        order: {
          number: orderNumber,
          business: business._id,
          user: user._id,
          products,
          totalPrice,
        },
      });

      res.status(201).json(newOrder);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async resolve(req, res) {
    try {
      const { id } = req.params;
      const { resolve } = req.body;

      const order = await orderService.getById({ id });

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      if (order.status !== "pending") {
        return res.status(400).json({
          message: "Order is not pending",
        });
      }

      if (resolve !== "completed" && resolve !== "cancelled") {
        return res.status(400).json({
          message: "Invalid resolve value",
        });
      }

      order.status = resolve;

      const updatedOrder = await orderService.update({
        id,
        order,
      });

      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export const orderController = new OrderController();
