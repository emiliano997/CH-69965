import { POLICIES } from "../utils/policies.js";
import { CustomRouter } from "./router.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = "s3cr3t";

class AuthRouter extends CustomRouter {
  init() {
    this.post("/login", [POLICIES.public], (req, res) => {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.sendUserError(400, "Falta información");
      }

      const payload = {
        email,
        role: POLICIES.admin,
      };

      const token = jwt.sign(payload, JWT_SECRET);

      res.sendSuccess(token);
    });
  }
}

export const authRouter = new AuthRouter();
