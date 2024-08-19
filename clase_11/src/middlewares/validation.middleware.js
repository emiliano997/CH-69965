import { ContactDto } from "../dto/contact.dto.js";

export function validateContact(req, res, next) {
  const { firstName, lastName, email, phone } = req.body;

  if (!firstName || !lastName || !email || !phone) {
    return res.status(400).json({
      message: "Todos los campos son requeridos",
    });
  }

  const contact = new ContactDto({
    first_name: firstName,
    last_name: lastName,
    email,
    phone,
  });

  req.contact = contact;

  next();
}

export function validate(schema) {
  return async (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: "Error de validación",
        details: error.details,
      });
    }

    next();
  };
}

export function transformContact(req, res, next) {
  if (req.body.firstName && req.body.lastName) {
    req.body.name = `${req.body.firstName} ${req.body.lastName}`;
    delete req.body.firstName;
    delete req.body.lastName;
  }

  next();
}
