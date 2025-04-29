import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import ApiError from '../utils/api';
import httpStatus from 'http-status';
import pick from 'lodash/pick';

const validate =
  (schema: Joi.ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
    // console.log('Validating request:', req.body); // Debug log

    const validSchema = pick(schema, ['body', 'query', 'params']);
    const object = pick(req, Object.keys(validSchema));

    const { error, value } = schema.validate(object, {
      abortEarly: false,
      allowUnknown: false,
    });

    if (error) {
      // console.log('Validation errors:', error.details); // Debug log
      const errorMessage = error.details.map((detail) => detail.message).join(', ');
      return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    }

    Object.assign(req, value);
    next();
  };

export default validate;
