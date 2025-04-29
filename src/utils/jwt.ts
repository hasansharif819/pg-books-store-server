import jwt from 'jsonwebtoken';
import { config } from '../config/env';

export const generateToken = (userId: number): string => {
  return jwt.sign({ id: userId }, config.jwt.secret, {
    expiresIn: '1d',
  });
};

export const verifyToken = (token: string): { id: number } => {
  return jwt.verify(token, config.jwt.secret) as { id: number };
};
