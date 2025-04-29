"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../config/db"));
class Book {
    /**
     * Get all books with pagination
     */
    static async getAll(page = 1, limit = 10, search = '', authorId) {
        const offset = (page - 1) * limit;
        const query = (0, db_1.default)(this.table).where('title', 'ilike', `%${search}%`).offset(offset).limit(limit);
        if (authorId) {
            query.where({ author_id: authorId });
        }
        return query.select('*');
    }
    /**
     * Get book by ID
     */
    static async getById(id) {
        return (0, db_1.default)(this.table).where({ id }).first();
    }
    /**
     * Create a new book
     */
    static async create(book) {
        const [newBook] = await (0, db_1.default)(this.table).insert(book).returning('*');
        return newBook;
    }
    /**
     * Update book by ID
     */
    static async update(id, book) {
        const [updatedBook] = await (0, db_1.default)(this.table).where({ id }).update(book).returning('*');
        return updatedBook;
    }
    /**
     * Delete book by ID
     */
    static async delete(id) {
        return (0, db_1.default)(this.table).where({ id }).del();
    }
    /**
     * Get author of a book
     */
    static async getAuthor(bookId) {
        return (0, db_1.default)('authors')
            .join('books', 'authors.id', 'books.author_id')
            .where('books.id', bookId)
            .select('authors.*')
            .first();
    }
}
Book.table = 'books';
exports.default = Book;
