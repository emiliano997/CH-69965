import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import routes from "./routes/";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

const app: Express = express();
const PORT: number = 5000;

// Express configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());

// Mongoose configuration
mongoose
  .connect("mongodb://localhost:27017/after_class")
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

// Routes
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});

app.use("/api", routes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
