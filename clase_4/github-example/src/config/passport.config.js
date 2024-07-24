import passport from "passport";
import GithubStrategy from "passport-github2";
import { userModel } from "../models/user.model.js";

export const initializePassport = () => {
  passport.use(
    "github",
    new GithubStrategy(
      {
        clientID: "Iv23liA4tQLER1rFSSms",
        clientSecret: "e59e7ae628e67c7c3d155f142d94d5e307cc682b",
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
