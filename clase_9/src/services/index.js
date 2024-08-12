import { ToyService as ToyServiceMongo } from "./mongo/toy.service.js";
import { ToyService as ToyServiceMemory } from "./memory/toy.service.js";
import { UserService as UserServiceMongo } from "./mongo/user.service.js";
import { UserService as UserServiceMemory } from "./memory/user.service.js";
import { config } from "../config/config.js";

function getService() {
  switch (config.PERSISTANCE) {
    case "mongo":
      return {
        toyService: new ToyServiceMongo(),
        userService: new UserServiceMongo(),
      };
    case "memory":
      return {
        toyService: new ToyServiceMemory(),
        userService: new UserServiceMemory(),
      };
    default:
      return {
        toyService: new ToyServiceMongo(),
        userService: new UserServiceMongo(),
      };
  }
}

export const { toyService, userService } = getService();
