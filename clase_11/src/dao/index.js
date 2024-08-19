import mongoDao from "./mongo/index.js";
import memoryDao from "./memory/index.js";
import { config } from "../config/config.js";
import { connect } from "mongoose";

function getDao() {
  switch (config.PERSISTANCE) {
    case "memory":
      return {
        productDao: new memoryDao.productDao(),
        contactDao: new memoryDao.contactDao(),
        // ...
      };

    case "mongo":
    default:
      connect(config.MONGO_URI)
        .then(() => console.log("MongoDB connected"))
        .catch((error) => console.log(error));

      return {
        productDao: new mongoDao.productDao(),
        contactDao: new mongoDao.contactDao(),
        // ...
      };
  }
}

export const { contactDao, productDao } = getDao();
