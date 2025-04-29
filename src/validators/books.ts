import Joi from 'joi';

export const bookCreateSchema = Joi.object({
  body: Joi.object({
    title: Joi.string().required().min(3).max(200),
    description: Joi.string().optional().max(1000),
    published_date: Joi.date().required().max('now'),
    author_id: Joi.number().required().min(1),
  }),
});

export const bookUpdateSchema = Joi.object({
  body: Joi.object({
    title: Joi.string().min(3).max(200),
    description: Joi.string().optional().max(1000),
    published_date: Joi.date().max('now'),
    author_id: Joi.number().min(1),
  }),
});
