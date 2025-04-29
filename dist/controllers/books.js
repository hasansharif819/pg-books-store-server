"use strict";
// import { Request, Response } from 'express';
// import bookService from '../services/books';
// import { pick } from 'lodash';
// import httpStatus from 'http-status';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const books_1 = __importDefault(require("../services/books"));
const lodash_1 = require("lodash");
const sendResponse_1 = __importDefault(require("@/utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
class BookController {
    async getBooks(req, res) {
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const limit = Math.min(100, Math.max(1, parseInt(req.query.limit))) || 10;
        const search = req.query.search || '';
        const authorId = req.query.author ? parseInt(req.query.author) : undefined;
        const sortBy = ['title', 'published_date', 'created_at'].includes(req.query.sortBy)
            ? req.query.sortBy
            : 'title';
        const sortOrder = req.query.sortOrder === 'desc' ? 'desc' : 'asc';
        const result = await books_1.default.getAllBooks(page, limit, search, authorId, sortBy, sortOrder);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.CREATED,
            success: true,
            message: 'Books are fetched successfully',
            data: result.data,
            meta: result.meta,
        });
    }
    async getBook(req, res) {
        const book = await books_1.default.getBookById(parseInt(req.params.id));
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.CREATED,
            success: true,
            message: 'Book is fetched successfully',
            data: book,
        });
    }
    async createBook(req, res) {
        const bookData = (0, lodash_1.pick)(req.body, ['title', 'description', 'published_date', 'author_id']);
        const newBook = await books_1.default.createBook(bookData);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.CREATED,
            success: true,
            message: 'Book created successfully',
            data: newBook,
        });
    }
    async updateBook(req, res) {
        const updatedBook = await books_1.default.updateBook(parseInt(req.params.id), (0, lodash_1.pick)(req.body, ['title', 'description', 'published_date', 'author_id']));
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.CREATED,
            success: true,
            message: 'Book is updated successfully',
            data: updatedBook,
        });
    }
    async deleteBook(req, res) {
        await books_1.default.deleteBook(parseInt(req.params.id));
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.CREATED,
            success: true,
            message: 'Book is deleted successfully',
        });
    }
}
exports.default = new BookController();
