import { ErrorRequestHandler } from 'express';
import ApiError from '../utils/api';
import httpStatus from 'http-status';
import logger from '../config/logger';

const errorConverter: ErrorRequestHandler = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    const message =
      err.message ||
      (httpStatus[statusCode as keyof typeof httpStatus] as string) || // add type assertion
      'Internal Server Error';
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let { statusCode, message } = err;

  if (process.env.NODE_ENV === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR] as string;
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  };

  if (process.env.NODE_ENV === 'development') {
    logger.error(err);
  }

  res.status(statusCode).send(response);
};

export { errorConverter, errorHandler };
