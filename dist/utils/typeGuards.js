"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isApiError = isApiError;
// src/utils/typeGuards.ts
const apiError_1 = __importDefault(require("./apiError"));
function isApiError(error) {
    return error instanceof apiError_1.default;
}
