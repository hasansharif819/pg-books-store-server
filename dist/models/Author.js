"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../config/db"));
class Author {
    /**
     * Get all authors with pagination
     */
    static async getAll(page = 1, limit = 10, search = '') {
        const offset = (page - 1) * limit;
        return (0, db_1.default)(this.table)
            .where('name', 'ilike', `%${search}%`)
            .offset(offset)
            .limit(limit)
            .select('*');
    }
    /**
     * Get author by ID
     */
    static async getById(id) {
        return (0, db_1.default)(this.table).where({ id }).first();
    }
    /**
     * Create a new author
     */
    static async create(author) {
        const [newAuthor] = await (0, db_1.default)(this.table).insert(author).returning('*');
        return newAuthor;
    }
    /**
     * Update author by ID
     */
    static async update(id, author) {
        const [updatedAuthor] = await (0, db_1.default)(this.table).where({ id }).update(author).returning('*');
        return updatedAuthor;
    }
    /**
     * Delete author by ID
     */
    static async delete(id) {
        return (0, db_1.default)(this.table).where({ id }).del();
    }
    /**
     * Get books by author ID
     */
    static async getBooksByAuthorId(authorId) {
        return (0, db_1.default)('books').where({ author_id: authorId });
    }
}
Author.table = 'authors';
exports.default = Author;
