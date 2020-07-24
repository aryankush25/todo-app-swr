import Joi from '@hapi/joi';
import * as validations from './validations';

export const registerSchema = Joi.object({
  firstName: validations.stringRequired,
  lastName: validations.stringRequired,
  email: validations.emailRequired,
  password: validations.stringRequired
});

export const loginSchema = Joi.object({
  email: validations.emailRequired,
  password: validations.stringRequired
});
