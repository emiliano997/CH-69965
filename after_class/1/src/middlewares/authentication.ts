import { NextFunction, Request, Response } from "express";
import { User, userModel } from "../models/user.model";

export async function authentication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(req.cookies);

  if (req.cookies.user) {
    const email = req.cookies.user;

    try {
      const user = await userModel.findOne({ email }).lean<User>();

      if (!user) {
        return res.status(401).json({ message: "Usuario no encontrado" });
      }

      req.user = user;
      next();
    } catch (error: any) {
      res.status(500).json({ error: "Hubo un error", details: error.message });
    }
  } else {
    return res.status(401).json({ message: "No hay sesión iniciada" });
  }
}
