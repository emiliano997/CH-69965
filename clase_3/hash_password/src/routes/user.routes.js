import { Router } from "express";
import { userModel } from "../models/user.model.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const users = await userModel.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Hubo un error", details: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userModel.findById(id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Hubo un error", details: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userModel.findByIdAndDelete(id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Hubo un error", details: error.message });
  }
});

export default router;
