"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = __importDefault(require("../utils/api"));
const http_status_1 = __importDefault(require("http-status"));
const pick_1 = __importDefault(require("lodash/pick"));
const validate = (schema) => (req, res, next) => {
    // console.log('Validating request:', req.body); // Debug log
    const validSchema = (0, pick_1.default)(schema, ['body', 'query', 'params']);
    const object = (0, pick_1.default)(req, Object.keys(validSchema));
    const { error, value } = schema.validate(object, {
        abortEarly: false,
        allowUnknown: false,
    });
    if (error) {
        // console.log('Validation errors:', error.details); // Debug log
        const errorMessage = error.details.map((detail) => detail.message).join(', ');
        return next(new api_1.default(http_status_1.default.BAD_REQUEST, errorMessage));
    }
    Object.assign(req, value);
    next();
};
exports.default = validate;
