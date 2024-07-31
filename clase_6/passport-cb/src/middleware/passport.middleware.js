import passport from "passport";

export function passportCall(strategy) {
  return async (req, res, next) => {
    passport.authenticate(strategy, function (error, user, info) {
      if (error) return next(error);

      if (!user)
        return res.status(401).json({
          error: "Unauthorized",
          details: info.messages ? info.messages : info.toString(),
        });

      req.user = user;
      next();
    })(req, res, next);
  };
}
