process.on("exit", (code) => {
  console.log(
    `El worker con el id ${process.pid} ha finalizado con el código: ${code}`
  );
});

process.on("message", (message) => {
  setTimeout(async () => {
    const data = await fetch("https://jsonplaceholder.typicode.com/todos");
    const tasks = await data.json();

    process.send(tasks.length);
  }, 5000);
});
