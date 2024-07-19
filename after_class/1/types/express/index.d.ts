import { User } from "../../src/models/user.model";

declare module "express-serve-static-core" {
  export interface Request {
    user?: User;
  }
}
