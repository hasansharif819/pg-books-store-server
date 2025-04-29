import httpStatus from 'http-status';

class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational: boolean = true,
    public stack: string = '',
  ) {
    super(message);
    this.name = this.constructor.name;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  static badRequest(message: string) {
    return new ApiError(httpStatus.BAD_REQUEST, message);
  }

  static notFound(message: string) {
    return new ApiError(httpStatus.NOT_FOUND, message);
  }

  static internal(message: string) {
    return new ApiError(httpStatus.INTERNAL_SERVER_ERROR, message, false);
  }
}

export default ApiError;
