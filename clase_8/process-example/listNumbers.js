const args = process.argv;

const ERRORS_DESCRIPTIONS = {
  empty: "No hay argumentos",
  invalid: "Argumento inválido",
  type_error: "Argumento no es del tipo esperado",
};

process.on("exit", (code) => {
  console.log(code);

  if (code) {
    return console.log("El proceso ha finalizado con el código:", code);
  }

  console.log("El proceso ha finalizado sin problemas");
});

process.on("uncaughtException", (error) => {
  console.log(error);

  switch (error.description) {
    case ERRORS_DESCRIPTIONS.empty:
      return process.exit(-4);
      break;

    case ERRORS_DESCRIPTIONS.type_error:
      process.exit(-5);
      break;

    default:
      process.exit(0);
      break;
  }
});

function listNumbers(numbers) {
  if (numbers.length === 0) {
    throw { description: ERRORS_DESCRIPTIONS.empty };
  }

  for (const number of numbers) {
    const val = Number(number);
    if (isNaN(val)) {
      throw {
        description: ERRORS_DESCRIPTIONS.type_error,
        numbers,
        tipos: numbers.map((n) => (isNaN(Number(n)) ? typeof n : "number")),
      };
    }
  }
}

const numbers = args.slice(2);
listNumbers(numbers);

console.log("Numbers:", numbers);
