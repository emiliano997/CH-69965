import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import FileStore from "session-file-store";
import MongoStore from "connect-mongo";

const fileStorage = FileStore(session);

const app = express();
const PORT = 5000;

// Express config
app.use(cookieParser());

// Session con FileStore
// app.use(
//   session({
//     store: new fileStorage({ path: "./sessions", ttl: 20 }),
//     secret: "s3cr3t",
//     resave: false,
//     saveUninitialized: false,
//   })
// );

// Session con MongoStore
app.use(
  session({
    store: new MongoStore({
      mongoUrl: "mongodb://localhost:27017/clase_2",
      ttl: 20,
    }),
    secret: "s3cr3t",
    resave: false,
    saveUninitialized: false,
  })
);

// Routes
app.get("/session", (req, res) => {
  console.log(req.session);

  if (req.session.counter) {
    req.session.counter++;
    res.send(`Visitas: ${req.session.counter}`);
  } else {
    req.session.counter = 1;
    res.send(`Bienvenido`);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
