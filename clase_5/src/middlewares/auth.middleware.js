import { verifyToken } from "../utils/jwtFunction.js";

export function authenticate(req, res, next) {
  const token = req.cookies.currentUser;

  if (!token) {
    return res.status(401).json({
      error: "No hay sesión iniciada",
    });
  }

  try {
    const decoded = verifyToken(token);

    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({
      error: "Error de autenticación",
      details: error.message,
    });
  }
}

export function authorize(roles) {
  return (req, res, next) => {
    console.log(roles.includes(req.user.role));
    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        error: "No tienes permisos para acceder a esta ruta",
      });
    }

    next();
  };
}
