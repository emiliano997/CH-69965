import express from "express";
import wordRouter from "./routes/word.router.js";
import petRouter from "./routes/pet.router.js";

const app = express();
const PORT = 5000;

app.use(express.json());

// Routes
app.use("/api/dictionary", wordRouter);
app.use("/api/pets", petRouter);
app.use("*", (req, res) => {
  res.status(404).json({ message: "Page not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
