import { Router } from "express";
import { authorize } from "../middleware/auth.middleware.js";

const router = Router();

// BD
const users = [
  {
    name: "admin",
    email: "admin@example.com",
    password: "123",
    role: "admin",
  },
  {
    name: "admin2",
    email: "admin2@example.com",
    password: "123",
    role: "admin",
  },
  {
    name: "admin3",
    email: "admin3@example.com",
    password: "123",
    role: "admin",
  },
  {
    name: "user",
    email: "user@example.com",
    password: "123",
    role: "user",
  },
  {
    name: "user2",
    email: "user2@example.com",
    password: "123",
    role: "user",
  },
  {
    name: "user3",
    email: "user3@example.com",
    password: "123",
    role: "user",
  },
];

router.get("/", authorize(["read"]), async (req, res) => {
  res.json(users);
});

router.get("/admin", authorize(["read"]), async (req, res) => {
  res.json(users.filter((user) => user.role === "admin"));
});

router.post("/", authorize(["write"]), async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({
      error: "Falta información",
    });
  }

  users.push({
    name,
    email,
    password,
    role,
  });

  res.json({ message: "Usuario creado" });
});

export default router;
