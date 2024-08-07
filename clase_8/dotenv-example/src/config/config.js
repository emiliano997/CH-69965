import dotenv from "dotenv";
import { Command } from "commander";

const program = new Command();
program.option("-m, --mode <string>", "Definir modo del Servidor", "dev");

program.parse();

console.log(program.opts());

const { mode } = program.opts();

let path;

switch (mode) {
  case "development":
  case "dev":
    path = ".env.development";
    break;
  case "production":
    path = ".env.production";
    break;
  case "emi":
    path = ".env.emi";
    break;
  default:
    path = ".env";
    break;
}

dotenv.config({
  path,
});

console.log(process.env.PORT);
console.log(process.env.MODE);
console.log(process.env.MONGO_URI);
console.log(process.env.JWT_SECRET);

// export default {
//   PORT: process.env.PORT,
//   MODE: process.env.MODE,
//   MONGO_URI: process.env.MONGO_URI,
//   JWT_SECRET: process.env.JWT_SECRET,
// };

export const config = {
  PORT: process.env.PORT,
  MODE: process.env.MODE,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
};
