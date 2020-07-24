import Joi from '@hapi/joi';

export const stringRequired = Joi.string().required();
export const emailRequired = Joi.string()
  .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
  .required();
