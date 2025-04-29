"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authors_1 = __importDefault(require("../controllers/authors"));
const authors_2 = require("../validators/authors");
const validate_1 = __importDefault(require("../middlewares/validate"));
const router = (0, express_1.Router)();
router.get('/', authors_1.default.getAuthors);
router.get('/:id', authors_1.default.getAuthor);
router.post('/', (0, validate_1.default)(authors_2.authorCreateSchema), authors_1.default.createAuthor);
router.put('/:id', (0, validate_1.default)(authors_2.authorUpdateSchema), authors_1.default.updateAuthor);
router.delete('/:id', authors_1.default.deleteAuthor);
exports.default = router;
