import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import ApiError from '../utils/api';
import { config } from '../config/env';

const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return next(new ApiError(httpStatus.UNAUTHORIZED, 'Authentication required'));
  }

  try {
    const decoded = jwt.verify(token, config.jwt.secret) as { id: number };
    req.user = decoded; // Now properly typed
    next();
  } catch (error) {
    return next(new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token'));
  }
};

export default auth;
