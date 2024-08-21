import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import morgan from "morgan";
import { connectDB } from "./config/connect.js";
import { config } from "./config/config.js";

const app = express();

// Express config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

// Mongoose config
connectDB();

// Routes
app.use("/api", routes);

// Start server
const port = config.PORT;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
