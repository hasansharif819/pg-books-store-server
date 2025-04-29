"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const books_1 = __importDefault(require("../services/books"));
const lodash_1 = require("lodash");
const http_status_1 = __importDefault(require("http-status"));
class BookController {
    /**
     * Get paginated and filtered books
     */
    async getBooks(req, res) {
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const limit = Math.min(100, Math.max(1, parseInt(req.query.limit))) || 10;
        const title = req.query.title || '';
        const authorId = req.query.author ? parseInt(req.query.author) : undefined;
        const sortBy = ['title', 'published_date', 'created_at'].includes(req.query.sortBy)
            ? req.query.sortBy
            : 'title';
        const sortOrder = req.query.sortOrder === 'desc' ? 'desc' : 'asc';
        const result = await books_1.default.getAllBooks(page, limit, title, authorId, sortBy, sortOrder);
        res.status(http_status_1.default.OK).json(result);
    }
    /**
     * Get single book with author details
     */
    async getBook(req, res) {
        const book = await books_1.default.getBookById(parseInt(req.params.id));
        res.status(http_status_1.default.OK).json(book);
    }
    /**
     * Create new book
     */
    async createBook(req, res) {
        const bookData = (0, lodash_1.pick)(req.body, ['title', 'description', 'published_date', 'author_id']);
        const newBook = await books_1.default.createBook(bookData);
        res.status(http_status_1.default.CREATED).json(newBook);
    }
    /**
     * Update book
     */
    async updateBook(req, res) {
        const updatedBook = await books_1.default.updateBook(parseInt(req.params.id), (0, lodash_1.pick)(req.body, ['title', 'description', 'published_date', 'author_id']));
        res.status(http_status_1.default.OK).json(updatedBook);
    }
    /**
     * Delete book
     */
    async deleteBook(req, res) {
        await books_1.default.deleteBook(parseInt(req.params.id));
        res.status(http_status_1.default.NO_CONTENT).send();
    }
}
exports.default = new BookController();
