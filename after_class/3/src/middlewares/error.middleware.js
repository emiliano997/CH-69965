export function errorHandler(err, req, res, next) {
  // Establecer el código de estado HTTP
  res.status(err.status || 500);

  // Responder con un mensaje de error
  res.json({
    error: {
      message: err.message,
      status: err.status,
    },
  });
}
