import Joi from "joi";

const productSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
});

export const businessDto = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  products: Joi.array().items(productSchema).required(),
});
