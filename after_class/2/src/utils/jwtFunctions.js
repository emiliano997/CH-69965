import jwt from "jsonwebtoken";

export const JWT_SECRET = "s3cr3t";

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
