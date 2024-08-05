import { Router } from "express";
import { POLICIES } from "../utils/policies.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = "s3cr3t";

export class CustomRouter {
  constructor() {
    this.router = Router(); // const router = Router();
    this.init();
  }

  // Método para inicializar el router
  init() {} // router.get("/", (req, res) => {});

  getRouter() {
    return this.router; // app.use("/api", router)
  }

  get(path, policies, ...callbacks) {
    // router.get("/", [passport.authenticate..., (req, res) => {}]);
    this.router.get(
      path,
      this.generateCustomResponse,
      this.handlePolicies(policies),
      this.applyCallbacks(callbacks)
    );
  }

  post(path, policies, ...callbacks) {
    // router.get("/", [passport.authenticate..., (req, res) => {}]);
    this.router.post(
      path,
      this.generateCustomResponse,
      this.handlePolicies(policies),
      this.applyCallbacks(callbacks)
    );
  }

  put(path, policies, ...callbacks) {
    // router.get("/", [passport.authenticate..., (req, res) => {}]);
    this.router.put(
      path,
      this.generateCustomResponse,
      this.handlePolicies(policies),
      this.applyCallbacks(callbacks)
    );
  }

  delete(path, policies, ...callbacks) {
    // router.get("/", [passport.authenticate..., (req, res) => {}]);
    this.router.delete(
      path,
      this.generateCustomResponse,
      this.handlePolicies(policies),
      this.applyCallbacks(callbacks)
    );
  }

  applyCallbacks(callbacks) {
    return callbacks.map((callback) => async (...params) => {
      try {
        await callback.apply(this, params);
      } catch (error) {
        console.log(error);
        params[1] // res.status(500).json({ message: "Hubo un error" });
          .status(500)
          .json({ message: "Hubo un error", details: error.message });
      }
    });
  }

  generateCustomResponse(req, res, next) {
    // Respuestas personalizadas
    res.sendSuccess = (payload) =>
      res.status(200).json({ message: "Success", payload });
    res.sendServerError = (error) =>
      res.status(500).json({ message: "Server error", details: error.message });
    res.sendUserError = (error) =>
      res.status(400).json({ message: "User error", details: error.message });
    res.sendAuthorizationError = (error) =>
      res.status(401).json({ message: "Authorization error", details: error });

    next();
  }

  handlePolicies(policies) {
    return (req, res, next) => {
      if (policies.includes(POLICIES.public)) return next();

      const authHeader = req.headers.authorization;

      if (!authHeader)
        return res.sendAuthorizationError("No authorization header");

      const [, token] = authHeader.split(" "); // Bearer asadasdasd

      try {
        const decoded = jwt.verify(token, JWT_SECRET);

        if (!policies.includes(decoded.role))
          return res.sendAuthorizationError("No autorizado");

        req.user = decoded;

        next();
      } catch (error) {
        return res.sendAuthorizationError(error);
      }
    };
  }
}
