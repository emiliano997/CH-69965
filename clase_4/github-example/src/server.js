import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
// import MongoStore from "connect-mongo";
import session from "express-session";
import handlebars from "express-handlebars";
import path from "path";
import __dirname from "./dirname.js";
import viewsRoutes from "./routes/views.routes.js";
import sessionRoutes from "./routes/session.routes.js";
import { initializePassport } from "./config/passport.config.js";
import passport from "passport";

const app = express();
const PORT = 5000;

// Express config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: "s3cr3t",
    resave: false,
    saveUninitialized: false, 
  })
);

// Mongoose Config
mongoose
  .connect("mongodb://localhost:27017/clase_3")
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

// Passport Config
initializePassport();
app.use(passport.initialize());


// Handlebars Config
app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
    defaultLayout: "main",
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Routes config
app.use("/api/sessions", sessionRoutes);
app.use("/", viewsRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
