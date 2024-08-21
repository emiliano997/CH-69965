import mongoose from "mongoose";
import { config } from "./config.js";

export function connectDB() {
  mongoose
    .connect(config.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));
}
