import passport from "passport";
import localStrategy from "passport-local";
import { userModel } from "../models/user.model.js";
import { createHash, verifyPassword } from "../utils/hashFunctions.js";

const LocalStrategy = localStrategy.Strategy;

export function initializePassport() {
  passport.use(
    "register",
    new LocalStrategy(
      {
        usernameField: "email",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
          const { first_name, last_name, age } = req.body;

          if (!first_name || !last_name || !age) {
            return done(null, false, {
              message: "Todos los campos son requeridos",
            });
          }

          const userExists = await userModel.findOne({ email });

          if (userExists) {
            return done(null, false, { message: "El usuario ya existe" });
          }

          const hashPassword = await createHash(password);

          const user = await userModel.create({
            first_name,
            last_name,
            email,
            age,
            password: hashPassword,
          });

          return done(null, user);
        } catch (error) {
          return done(`Hubo un error: ${error.message}`);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async (email, password, done) => {
        try {
          const user = await userModel.findOne({ email });

          if (!user) {
            return done(null, false, { message: "Usuario no encontrado" });
          }

          const isPasswordCorrect = await verifyPassword(
            password,
            user.password
          );

          if (!isPasswordCorrect) {
            return done(null, false, { message: "Contraseña incorrecta" });
          }

          return done(null, user);
        } catch (error) {
          console.log(error);
          return done(`Hubo un error: ${error.message}`);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await userModel.findById(id);

      return done(null, user);
    } catch (error) {
      return done(`Hubo un error: ${error.message}`);
    }
  });
}
