// console.log(process.cwd()); // Retorna la ruta absoluta del directorio actual
// console.log(process.pid); // Retorna el id del proceso actual
// console.log(process.memoryUsage()); // Retorna la memoria utilizada por el proceso actual
// console.log(process.env); // Entorno de ejecución actual
// console.log(process.version); // Retorna la versión de Node

// Argumentos
// console.log(process.argv); // Devuelve un array con los argumentos del proceso
// console.log(process.argv.slice(2));

// --------------------------------
// Trabajando con Commander
// --------------------------------
import { Command } from "commander";

const program = new Command();

program
  .option("-p, --port <number>", "Definir puerto del Servidor", 8000)
  .option("-m, --mode <string>", "Definir modo del Servidor", "dev")
  .requiredOption("-u, --user <string>", "Definir usuario del Servidor");

program.parse();

console.log("Options:", program.opts());
console.log("Arguments:", program.args);
