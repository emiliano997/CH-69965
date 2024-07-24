import express from "express";
import { authenticate, generateToken, verifyToken } from "./utils.js";

const app = express();
const PORT = 5000;

const users = [];

// Express config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      error: "Falta información",
    });
  }

  const user = {
    name,
    email,
    password,
  };

  users.push(user);

  res.json(user);
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: "Falta información",
    });
  }

  const user = users.find((user) => user.email === email);

  if (!user) {
    return res.status(401).json({
      error: "Usuario no encontrado",
    });
  }

  if (user.password !== password) {
    return res.status(401).json({
      error: "Contraseña incorrecta",
    });
  }

  const payload = {
    email: user.email,
    name: user.name,
  };
  const token = generateToken(payload);

  res.json({
    token,
    message: "Login exitoso",
  });
});

app.get("/profile", authenticate, (req, res) => {
  const user = users.find((user) => user.email === req.user.email);

  if (!user) {
    return res.status(401).json({
      error: "Usuario no encontrado",
    });
  }

  res.json(user);
});

// Listen
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
