import { Router } from "express";
import { contactModel } from "../models/contact.model.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const contacts = await contactModel.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Hubo un error", details: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const contact = await contactModel.findById(id);
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: "Hubo un error", details: error.message });
  }
});

router.post("/", async (req, res) => {
  const { name, email, phone } = req.body;
  console.log(name, email, phone);

  console.log(req.body);

  if (!name || !email || !phone) {
    return res.status(400).json({
      message: "Todos los campos son requeridos",
    });
  }

  try {
    const contact = await contactModel.create({
      name,
      email,
      phone,
    });

    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: "Hubo un error", details: error.message });
  }
});

export default router;
