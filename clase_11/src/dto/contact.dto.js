import Joi from "joi";

export class ContactDto {
  constructor({ first_name, last_name, email, phone }) {
    this.name = `${first_name} ${last_name}`; // No acepte numeros
    this.email = email; // example@example.com
    this.phone = phone; // 11-1234-5678
  }
}

export const contactDto = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});
