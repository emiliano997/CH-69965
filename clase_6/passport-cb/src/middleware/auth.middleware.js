const permissionsDB = {
  admin: ["read", "write"],
  user: ["read"],
};

export function authorize(permissions) {
  return async (req, res, next) => {
    if (!req.user)
      return res.status(401).json({ error: "No hay sesión iniciada" });

    // if (!roles.includes(req.user.role)) {
    //   return res.status(401).json({
    //     error: "No tienes permisos para acceder a esta ruta",
    //   });
    // }

    console.log(
      permissions.some((permission) =>
        permissionsDB[req.user.role].includes(permission)
      )
    );

    if (
      !permissions.some((permission) =>
        permissionsDB[req.user.role].includes(permission)
      )
    ) {
      return res.status(401).json({
        error: "No tienes permisos para acceder a esta ruta",
      });
    }

    next();
  };
}
