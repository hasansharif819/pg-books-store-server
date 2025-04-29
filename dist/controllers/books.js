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
     * Get all books
     */
    async getBooks(req, res) {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || '';
        const authorId = req.query.author ? parseInt(req.query.author) : undefined;
        const books = await books_1.default.getAllBooks(page, limit, search, authorId);
        res.status(http_status_1.default.OK).json(books);
    }
    /**
     * Get book by ID
     */
    async getBook(req, res) {
        const bookId = parseInt(req.params.id);
        const book = await books_1.default.getBookById(bookId);
        res.status(http_status_1.default.OK).json(book);
    }
    /**
     * Create a new book
     */
    async createBook(req, res) {
        const bookData = {
            title: req.body.title,
            description: req.body.description,
            published_date: req.body.publishedDate, // Map to database column name
            author_id: req.body.author_id,
        };
        const newBook = await books_1.default.createBook(bookData);
        res.status(201).json(newBook);
    }
    /**
     * Update book by ID
     */
    async updateBook(req, res) {
        const bookId = parseInt(req.params.id);
        const bookData = (0, lodash_1.pick)(req.body, ['title', 'description', 'published_date', 'author_id']);
        const updatedBook = await books_1.default.updateBook(bookId, bookData);
        res.status(http_status_1.default.OK).json(updatedBook);
    }
    /**
     * Delete book by ID
     */
    async deleteBook(req, res) {
        const bookId = parseInt(req.params.id);
        await books_1.default.deleteBook(bookId);
        res.status(http_status_1.default.NO_CONTENT).send();
    }
}
exports.default = new BookController();
