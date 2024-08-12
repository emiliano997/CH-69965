import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import { config } from "./config/config.js";
import routes from "./routes/index.routes.js";

const app = express();

// Express config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Mongoose Config
mongoose
  .connect(config.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

// Routes config
app.use("/api", routes);

// Start server
app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
