"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
class ApiError extends Error {
    constructor(statusCode, message, isOperational = true, stack = '') {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.isOperational = isOperational;
        this.stack = stack;
        this.name = this.constructor.name;
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
    static badRequest(message) {
        return new ApiError(http_status_1.default.BAD_REQUEST, message);
    }
    static notFound(message) {
        return new ApiError(http_status_1.default.NOT_FOUND, message);
    }
    static internal(message) {
        return new ApiError(http_status_1.default.INTERNAL_SERVER_ERROR, message, false);
    }
}
exports.default = ApiError;
