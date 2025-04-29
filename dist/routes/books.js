"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const books_1 = __importDefault(require("../controllers/books"));
const validate_1 = __importDefault(require("../middlewares/validate"));
const books_2 = require("../validators/books");
const router = (0, express_1.Router)();
router.get('/', books_1.default.getBooks);
router.get('/:id', books_1.default.getBook);
router.post('/', (0, validate_1.default)(books_2.bookCreateSchema), books_1.default.createBook);
router.put('/:id', (0, validate_1.default)(books_2.bookUpdateSchema), books_1.default.updateBook);
router.delete('/:id', books_1.default.deleteBook);
exports.default = router;
