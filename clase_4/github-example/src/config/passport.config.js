import passport from "passport";
import GithubStrategy from "passport-github2";
import { userModel } from "../models/user.model.js";

export const initializePassport = () => {
  passport.use(
    "github",
    new GithubStrategy(
      {
        clientID: "",
        clientSecret: "",
        callbackURL: "http://localhost:5000/api/sessions/githubcallback",
        scope: ["user:email"],
      },
      async (access_token, refresh_token, profile, done) => {
        try {
          console.log(profile);

          const email = profile.emails[0].value;

          const user = await userModel.findOne({
            email,
          });

          if (user) {
            return done(null, user);
          }

          const newUser = await userModel.create({
            name: profile.displayName,
            email,
            age: profile.agle || 0,
            githubId: profile.id,
          });

          return done(null, newUser);
        } catch (error) {
          return done(error);
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
};
