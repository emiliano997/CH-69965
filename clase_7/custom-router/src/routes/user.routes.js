import { POLICIES } from "../utils/policies.js";
import { CustomRouter } from "./router.js";

class UserRouter extends CustomRouter {
  init() {
    // this.get("/", userController.getAll);
    this.get("/", [POLICIES.public], (req, res) => {
      res.sendSuccess({ message: "Hello World" });
    });

    this.get("/profile", [POLICIES.user, POLICIES.admin], (req, res) => {
      res.sendSuccess(req.user);
    });

    this.get("/admin", [POLICIES.admin], (req, res) => {
      res.sendSuccess({ message: "Admin" });
    });
  }
}

// export default new UserRouter();
export const userRouter = new UserRouter();
