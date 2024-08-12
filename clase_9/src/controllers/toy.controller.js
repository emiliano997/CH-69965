import { toyService } from "../services/toy.service.js";

class ToyController {
  async getAll(req, res) {
    try {
      const toys = await toyService.getAll();
      res.status(200).json(toys);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Hubo un error", details: error.message });
    }
  }

  async getById(req, res) {
    const { id } = req.params;

    try {
      const toy = await toyService.getById(id);

      if (!toy) {
        return res.status(404).json({ message: "Juguete no encontrado" });
      }

      res.status(200).json(toy);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Hubo un error", details: error.message });
    }
  }

  async create(req, res) {
    const { name, price, stock } = req.body;

    if (!name || !price || !stock) {
      return res.status(400).json({
        message: "Todos los campos son requeridos",
      });
    }

    try {
      const toy = await toyService.create({
        name,
        price,
        stock,
      });

      res.status(201).json(toy);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Hubo un error", details: error.message });
    }
  }
}

export const toyController = new ToyController();
