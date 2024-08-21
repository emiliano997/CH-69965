import { businessService } from "../services/business.service.js";

class BusinessController {
  async getAll(req, res) {
    try {
      const businesses = await businessService.getAll();
      res.status(200).json(businesses);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const business = await businessService.getById({ id: req.params.id });

      if (!business) {
        return res.status(404).json({ message: "Business not found" });
      }

      res.status(200).json(business);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async create(req, res) {
    try {
      const business = req.body;

      const newBusiness = await businessService.create({ business });
      res.status(201).json(newBusiness);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      const updatedBusiness = await businessService.update({
        id,
        business: req.body,
      });
      res.status(200).json(updatedBusiness);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export const businessController = new BusinessController();
