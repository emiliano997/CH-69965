import express from "express";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

const app = express();
const PORT = 5000;

// Express config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: "Falta información",
    });
  }

  if (email !== "admin@example.com" || password !== "1234") {
    return res.status(401).json({
      error: "Usuario o contraseña incorrecto",
    });
  }

  const payload = {
    email,
  };

  const token = jwt.sign(payload, "s3cr3t", {
    expiresIn: "2m",
  });

  res.cookie("token", token, {
    maxAge: 100000,
    httpOnly: true,
  });

  res.json({ message: "Login exitoso" });
});

app.get("/current", (req, res) => {
  if (req.cookies.token) {
    res.json({ message: "Usuario logueado", token: req.cookies.token });
  } else {
    res.json({ message: "Usuario no logueado" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
