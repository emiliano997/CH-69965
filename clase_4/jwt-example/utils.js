import jwt from "jsonwebtoken";

const JWT_SECRET = "s3cr3t";

export function generateToken(payload) {
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: "2m",
  });
  return token;
}

export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error(`Invalid token: ${error}`);
  }
}

// Middleware para validar el token
export function authenticate(req, res, next) {
  const token =
    req.headers.authorization.split(" ")[1] ||
    req.headers["authorization"].split(" ")[1];

  if (!token) {
    return res.status(401).json({
      error: "Falta token",
    });
  }

  try {
    const decoded = verifyToken(token);

    // Validación de que el usuario exista

    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      error: "Token inválido",
    });
  }
}
