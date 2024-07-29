import express from "express";
import indexRoutes from "./routes/index.routes.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import handlebars from "express-handlebars";
import viewsRoutes from "./routes/views.routes.js";

const app = express();
const PORT = 5000;

// Express config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Handlebars config
app.engine(
  "hbs",
  handlebars.engine({ extname: ".hbs", defaultLayout: "main" })
);
app.set("view engine", "hbs");
app.set("views", "./src/views");

// Mongoose config
mongoose
  .connect("mongodb://localhost:27017/practica_integradora")
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

// Routes config
app.use("/api", indexRoutes);
app.use("/", viewsRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
