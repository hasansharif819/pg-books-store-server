"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.errorConverter = void 0;
const api_1 = __importDefault(require("../utils/api"));
const http_status_1 = __importDefault(require("http-status"));
const logger_1 = __importDefault(require("../config/logger"));
const errorConverter = (err, req, res, next) => {
    let error = err;
    if (!(error instanceof api_1.default)) {
        const statusCode = err.statusCode || http_status_1.default.INTERNAL_SERVER_ERROR;
        const message = err.message ||
            http_status_1.default[statusCode] || // add type assertion
            'Internal Server Error';
        error = new api_1.default(statusCode, message, false, err.stack);
    }
    next(error);
};
exports.errorConverter = errorConverter;
const errorHandler = (err, req, res, next) => {
    let { statusCode, message } = err;
    if (process.env.NODE_ENV === 'production' && !err.isOperational) {
        statusCode = http_status_1.default.INTERNAL_SERVER_ERROR;
        message = http_status_1.default[http_status_1.default.INTERNAL_SERVER_ERROR];
    }
    res.locals.errorMessage = err.message;
    const response = {
        code: statusCode,
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    };
    if (process.env.NODE_ENV === 'development') {
        logger_1.default.error(err);
    }
    res.status(statusCode).send(response);
};
exports.errorHandler = errorHandler;
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
