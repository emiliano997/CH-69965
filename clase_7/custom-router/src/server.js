import express from "express";
import { userRouter } from "./routes/user.routes.js";
import { authRouter } from "./routes/auth.routes.js";

const app = express();
const PORT = 5000;

app.use(express.json());

// Routes
app.use("/api/auth", authRouter.getRouter());
app.use("/api/users", userRouter.getRouter());
app.use("*", (req, res) => {
  res.status(404).json({ message: "Page not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
