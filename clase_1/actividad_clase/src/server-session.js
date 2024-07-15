import express from "express";
import session from "express-session";

const app = express();
const PORT = 5000;

// Express config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "s3cr3t",
    resave: true,
    saveUninitialized: true,
  })
);

// Se crea la sesión dentro del objeto req
app.get("/", (req, res) => {
  const { user } = req.query;

  if (user && !req.session.user) {
    req.session.user = user;
  }

  if (req.session.counter) {
    req.session.counter++;
    if (req.session.user) {
      return res.send(
        `${req.session.user} ha accedido a la página ${req.session.counter} veces`
      );
    } else {
      return res.send(`Ha accedido a la página ${req.session.counter} veces`);
    }
  } else {
    req.session.counter = 1;
    if (req.session.user) {
      return res.send(`${req.session.user} ha accedido a la página 1 vez`);
    }
    return res.send(`Bienvenido`);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
