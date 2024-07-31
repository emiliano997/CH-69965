import passport from "passport";
import jwt from "passport-jwt";

const JWT_SECRET = "s3cr3t";
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

export function initializePassport() {
  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: JWT_SECRET,
      },
      async (payload, done) => {
        try {
          // Lógica de verificación de la info del token
          if (payload.email !== "admin@example.com") {
            console.log("payload", payload);
            return done(null, false);
          }
          return done(null, payload);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
}

function cookieExtractor(req) {
  let token = null;

  if (req && req.cookies) {
    token = req.cookies.token;
  }
  console.log("cookieExtractor", token);

  return token;
}
