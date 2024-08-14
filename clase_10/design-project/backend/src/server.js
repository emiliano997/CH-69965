import express from "express";
import morgan from "morgan";
import contactRoutes from "./routes/contact.routes.js";
import { MongoDBProvider } from "./providers/mongodb.provider.js";
import { config } from "./config/config.js";
import cors from "cors";

const app = express();

const whitelist = ["http://localhost:3000", "http://localhost:5173"];

// Express config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  cors({
    origin: whitelist,
    methods: "GET",
  })
);

// MongoDB Provider
MongoDBProvider.getInstance();

// Routes config
app.use("/api/contacts", contactRoutes);
app.use("/instance", (req, res) => {
  const instance = MongoDBProvider.getInstance();

  console.log(instance);

  res.json({ message: "Instance created" });
});

// Start server
app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
