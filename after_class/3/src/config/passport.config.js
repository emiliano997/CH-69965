import passport from "passport";
import local from "passport-local";
import jwt from "passport-jwt";
import { userModel } from "../models/user.model.js";
import { comparePassword, createHash } from "../utils/hash.js";
import { config } from "./config.js";

const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

function initializePassport() {
  // Login Strategy
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

          const isPasswordCorrect = await comparePassword(
            password,
            user.password
          );

          if (!isPasswordCorrect) {
            return done(null, false, { message: "Contraseña incorrecta" });
          }

          return done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

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

          const userExists = await userModel.findOne({ email });

          if (userExists) {
            return done({
              message: "El usuario ya existe",
              status: 409,
            });
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
          done(error);
        }
      }
    )
  );

  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([
          ExtractJWT.fromAuthHeaderAsBearerToken(),
          cookieExtractor,
        ]),
        secretOrKey: config.JWT_SECRET,
      },
      async (payload, done) => {
        try {
          const user = await userModel.findOne(
            { email: payload.email },
            { password: 0 }
          );

          if (!user) {
            return done({ message: "No se encontró el usuario", status: 401 });
          }

          return done(null, user);
        } catch (error) {
          done(error);
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
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
}

function cookieExtractor(req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["token"];
  }

  return token;
}

export { initializePassport };
