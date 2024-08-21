import Joi from "joi";

export const userDto = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  role: Joi.string().required(),
});
