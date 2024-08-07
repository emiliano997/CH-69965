import express from "express";
import { calculo } from "./calculo.js";
import { fork } from "child_process";
import morgan from "morgan";

const app = express();
const PORT = 5000;

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.get("/bloqueante", (req, res) => {
  const sum = calculo();
  res.json({ sum });
});

app.get("/no-bloqueante", (req, res) => {
  const child = fork("./no-bloqueante.js");
  child.send("Inicia el proceso, por favor"); // El padre envia un mensaje al hijo

  child.on("message", (message) => {
    res.json({ result: `El resultado es: ${message}` });
  });
});

app.get("/servicio-externo-bloqueante", (req, res) => {
  setTimeout(async () => {
    const data = await fetch("https://jsonplaceholder.typicode.com/todos");
    const tasks = await data.json();

    res.json({ result: tasks.length });
  }, 5000);
});

app.get("/servicio-externo", (req, res) => {
  const child = fork("./servicioExterno.js");
  child.send("Inicia el proceso, por favor");

  child.on("message", (message) => {
    res.json({ result: `El resultado es: ${message}` });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
