import Joi from 'joi';

export const authorCreateSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().required().min(3).max(100),
    bio: Joi.string().optional().max(500),
    birthdate: Joi.date().required().max('now'),
  }),
});

export const authorUpdateSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().min(3).max(100),
    bio: Joi.string().optional().max(500),
    birthdate: Joi.date().max('now'),
  }),
});
