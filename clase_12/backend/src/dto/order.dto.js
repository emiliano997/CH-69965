import Joi from "joi";

export const orderDto = Joi.object({
  user: Joi.string().hex().length(24).required(),
  business: Joi.string().hex().length(24).required(),
  products: Joi.array().items(Joi.string().hex().length(24)).required(),
});
