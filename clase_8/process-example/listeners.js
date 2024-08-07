// process.on("uncaughtException", (err) => {
//   console.log("Error no controlado: ", err.message);
// });

process.on("exit", (code) => {
  console.log("Exit:", code);
});

// try {
//   console();
// } catch (err) {
//   console.log("Error en el catch:", err.message);
// }

console();
