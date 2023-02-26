import { Joi } from "express-validation";

const loginSchema = {
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(8).required(),
  }),
};

export default loginSchema;
