"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorUpdateSchema = exports.authorCreateSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.authorCreateSchema = joi_1.default.object({
    body: joi_1.default.object({
        name: joi_1.default.string().required().min(3).max(100),
        bio: joi_1.default.string().optional().max(500),
        birthdate: joi_1.default.date().required().max('now'),
    }),
});
exports.authorUpdateSchema = joi_1.default.object({
    body: joi_1.default.object({
        name: joi_1.default.string().min(3).max(100),
        bio: joi_1.default.string().optional().max(500),
        birthdate: joi_1.default.date().max('now'),
    }),
});
