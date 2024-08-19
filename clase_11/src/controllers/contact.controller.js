import { contactRepository } from "../repository/index.js";

class ContactController {
  async getAll(req, res) {
    try {
      const contacts = await contactRepository.getAll();
      res.status(200).json(contacts);
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
      const contact = await contactRepository.getById({ id });
      res.status(200).json(contact);
    } catch (error) {
      res.status(500).json({
        message: "Hubo un error",
        details: error.message,
      });
    }
  }

  async create(req, res) {
    const contact = req.body;

    try {
      const newContact = await contactRepository.create({
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
      });
      res.status(201).json(newContact);
    } catch (error) {
      res.status(500).json({
        message: "Hubo un error",
        details: error.message,
      });
    }
  }
}

export const contactController = new ContactController();
