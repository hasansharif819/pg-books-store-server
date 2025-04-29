"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_1 = __importDefault(require("http-status"));
const api_1 = __importDefault(require("../utils/api"));
const env_1 = require("../config/env");
const auth = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return next(new api_1.default(http_status_1.default.UNAUTHORIZED, 'Authentication required'));
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, env_1.config.jwt.secret);
        req.user = decoded; // Now properly typed
        next();
    }
    catch (error) {
        return next(new api_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid token'));
    }
};
exports.default = auth;
