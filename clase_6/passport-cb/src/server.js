import express from "express";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import passport from "passport";
import { initializePassport } from "./config/passport.config.js";
import { passportCall } from "./middleware/passport.middleware.js";
import userRoutes from "./routes/user.routes.js";

const app = express();
const PORT = 5000;

// Express config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
initializePassport();
app.use(passport.initialize());

// Routes
app.post("/login", (req, res) => {
  const { email, password, role } = req.body;
  console.log(role);

  if (!email || !password || !role) {
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
    role,
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

app.get("/current", passportCall("jwt"), (req, res) => {
  res.json({ message: "Usuario logueado", user: req.user });
});

app.use("/users", passportCall("jwt"), userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
