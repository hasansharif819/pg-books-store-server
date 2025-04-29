"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const api_1 = __importDefault(require("../utils/api"));
const http_status_1 = __importDefault(require("http-status"));
class BookService {
    /**
     * Get all books
     */
    async getAllBooks(page, limit, search, authorId) {
        return models_1.Book.getAll(page, limit, search, authorId);
    }
    /**
     * Get book by ID
     */
    async getBookById(id) {
        const book = await models_1.Book.getById(id);
        if (!book) {
            throw new api_1.default(http_status_1.default.NOT_FOUND, 'Book not found');
        }
        const author = await models_1.Book.getAuthor(id);
        return { ...book, author };
    }
    /**
     * Create a new book
     */
    async createBook(bookData) {
        return models_1.Book.create(bookData);
    }
    /**
     * Update book by ID
     */
    async updateBook(id, bookData) {
        const book = await models_1.Book.getById(id);
        if (!book) {
            throw new api_1.default(http_status_1.default.NOT_FOUND, 'Book not found');
        }
        const updatedBook = await models_1.Book.update(id, bookData);
        if (!updatedBook) {
            throw new api_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Failed to update book');
        }
        return updatedBook;
    }
    /**
     * Delete book by ID
     */
    async deleteBook(id) {
        const book = await models_1.Book.getById(id);
        if (!book) {
            throw new api_1.default(http_status_1.default.NOT_FOUND, 'Book not found');
        }
        const deletedCount = await models_1.Book.delete(id);
        if (deletedCount === 0) {
            throw new api_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Failed to delete book');
        }
    }
}
exports.default = new BookService();
