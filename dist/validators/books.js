"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookUpdateSchema = exports.bookCreateSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.bookCreateSchema = joi_1.default.object({
    body: joi_1.default.object({
        title: joi_1.default.string().required().min(3).max(200),
        description: joi_1.default.string().optional().max(1000),
        published_date: joi_1.default.date().required().max('now'),
        author_id: joi_1.default.number().required().min(1),
    }),
});
exports.bookUpdateSchema = joi_1.default.object({
    body: joi_1.default.object({
        title: joi_1.default.string().min(3).max(200),
        description: joi_1.default.string().optional().max(1000),
        published_date: joi_1.default.date().max('now'),
        author_id: joi_1.default.number().min(1),
    }),
});
