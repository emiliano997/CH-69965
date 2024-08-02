import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import passport from "passport";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import { initializePassport } from "./config/passport.config.js";

const app = express();
const PORT = 5000;

// Express config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());

// Passport Config
initializePassport();
app.use(passport.initialize());

// Mongoose Config
mongoose
  .connect("mongodb://localhost:27017/after_class_2")
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

// Routes config
app.use("/api/auth", authRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
