import passport from "passport";

export function authorizations(roles) {
  return async (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "No autorizado" });

    if (!roles.includes(req.user.role)) {
      return res.status(401).json({ message: "No tienes permisos" });
    }

    next();
  };
}

export function authenticate(strategy) {
  return async (req, res, next) => {
    passport.authenticate(
      strategy,
      { session: false },
      async (error, user, info) => {
        if (error) return next(error);

        if (!user)
          return res.status(401).json({
            message: info.messages
              ? info.messages
              : info.toString().split(": ")[1],
          });

        req.user = user;
        next();
      }
    )(req, res, next);
  };
}
