import express from "express";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 5000;

// Express config
// app.use(cookieParser());
app.use(cookieParser("cod3rs3cr3t"));
app.use(express.static("public"));

// "CRUD" cookies
app.get("/set-cookie", (req, res) => {
  res.cookie("coderCookie", "Mi Nueva Cookie", {
    maxAge: 100000,
  });
  res.json({ message: "Cookie set" });
});

app.get("/set-signed-cookie", (req, res) => {
  res.cookie("signedCookie", "Mi Cookie Firmada", {
    maxAge: 100000,
    signed: true,
  });
  res.json({ message: "Signed Cookie set" });
});

app.get("/get-cookies", (req, res) => {
  res.json({
    cookies: req.cookies,
    signed: req.signedCookies,
  });
});

app.get("/delete-cookie", (req, res) => {
  res.clearCookie("coderCookie");

  res.json({ message: "Cookie deleted" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
