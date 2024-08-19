import Joi from "joi";

export const productDto = Joi.object({
  name: Joi.string().trim().min(3).max(50).required(),
  price: Joi.number().integer().positive().required(),
  stock: Joi.number().integer().positive().required(),
});
