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
     * Get paginated books with filtering and sorting
     */
    async getAllBooks(page = 1, limit = 10, title = '', authorId, sortBy = 'title', sortOrder = 'asc') {
        return models_1.Book.getAllWithAuthors(page, limit, title, authorId, sortBy, sortOrder);
    }
    /**
     * Get book by ID with author details
     */
    async getBookById(id) {
        const book = await models_1.Book.getByIdWithAuthor(id);
        if (!book)
            throw new api_1.default(http_status_1.default.NOT_FOUND, 'Book not found');
        return book;
    }
    /**
     * Create a new book
     */
    async createBook(bookData) {
        return models_1.Book.create(bookData);
    }
    /**
     * Update book
     */
    async updateBook(id, bookData) {
        const updatedBook = await models_1.Book.update(id, bookData);
        if (!updatedBook)
            throw new api_1.default(http_status_1.default.NOT_FOUND, 'Book not found');
        return updatedBook;
    }
    /**
     * Delete book
     */
    async deleteBook(id) {
        const deletedCount = await models_1.Book.delete(id);
        if (deletedCount === 0)
            throw new api_1.default(http_status_1.default.NOT_FOUND, 'Book not found');
    }
}
exports.default = new BookService();
