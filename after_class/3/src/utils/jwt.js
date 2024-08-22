import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

const { JWT_SECRET } = config;

export const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "30m",
  });
};

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    return decoded;
  } catch (error) {
    throw new Error("Token no valido");
  }
};
