import { connect } from "mongoose";
import { config } from "../config/config.js";

export class MongoDBProvider {
  static #instance;

  constructor() {
    connect(config.MONGO_URI)
      .then(() => console.log("MongoDB connected"))
      .catch((error) => console.log(error));
  }

  static getInstance() {
    if (this.#instance) {
      console.log("Instance already created");
      return this.#instance;
    }

    this.#instance = new MongoDBProvider();
    return this.#instance;
  }
}
