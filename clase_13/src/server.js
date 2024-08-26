import express from "express";
import morgan from "morgan";
import { config } from "./config/config.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use("/api/users", userRoutes);

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
