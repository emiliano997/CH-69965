import express from "express";
import cookieParser from "cookie-parser";
import path from "path";

const app = express();
const PORT = 5000;

// Express config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("s3cr3t"));
app.use(express.static("public"));

app.post("/setCookie", (req, res) => {
  const { name, email } = req.body;

  res.cookie("name", name, {
    maxAge: 100000,
  });

  res.cookie("email", email, {
    maxAge: 100000,
  });

  res.redirect("/");
});

// Get Cookie
app.get("/getCookie", (req, res) => {
  const cookie = req.cookies;

  res.send(cookie);
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
