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

// // src/middlewares/error.ts
// import { ErrorRequestHandler } from 'express';
// import { ApiResponse } from '../utils/apiResponse';
// import ApiError from '../utils/apiError';
// import httpStatus from 'http-status';

// export const errorConverter: ErrorRequestHandler = (err, req, res, next) => {
//   if (!(err instanceof ApiError)) {
//     const statusCode =
//       typeof err.statusCode === 'number' && httpStatus[err.statusCode as keyof typeof httpStatus]
//         ? err.statusCode
//         : httpStatus.INTERNAL_SERVER_ERROR;

//     const message = err.message || String(httpStatus[statusCode as keyof typeof httpStatus]);
//     err = new ApiError(statusCode, message, false, err.stack);
//   }
//   next(err);
// };

// export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
//   const { statusCode, message } = err;

//   ApiResponse.sendResponse(
//     res,
//     statusCode,
//     message,
//     null,
//     process.env.NODE_ENV === 'development' ? { stack: err.stack } : undefined,
//   );
// };

// export default { errorConverter, errorHandler };
