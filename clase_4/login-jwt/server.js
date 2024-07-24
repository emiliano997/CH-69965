import express from "express";
import handlebars from "express-handlebars";
import { generateToken, authToken } from "./utils.js";

const app = express();

app.engine(
  "hbs",
  handlebars.engine({ extname: ".hbs", defaultLayout: "main" })
);
app.set("view engine", "hbs");
app.set("views", "./views");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const users = []; // Persistencia en memoria

app.post("/api/register", (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);

  const exists = users.find((user) => user.email === email);

  if (exists) return res.status(400).json({ error: "User already exists" });

  const user = { name, email, password };

  users.push(user);
  const accessToken = generateToken(user);

  res.json({ user, accessToken });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  console.log(users);
  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (!user) return res.status(400).json({ error: "Invalid credentials" });

  const accessToken = generateToken(user);

  res.json({ user, accessToken });
});

app.get("/api/datos", authToken, (req, res) => {
  res.json({ users });
});

app.get("/current", authToken, (req, res) => {
  console.log(req.user);
  res.json(req.user);
});

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/noAutorizado", (req, res) => {
  res.render("noAutorizado");
});

app.get("/profile", authToken, (req, res) => {
  res.render("profile", { user: req.user });
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/page", (req, res) => {
  res.render("home");
});

app.listen(3000, () => console.log("Server started on port 3000"));
