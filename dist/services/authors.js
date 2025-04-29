"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const api_1 = __importDefault(require("../utils/api"));
const http_status_1 = __importDefault(require("http-status"));
class AuthorService {
    /**
     * Get all authors
     */
    async getAllAuthors(page, limit, search) {
        return models_1.Author.getAll(page, limit, search);
    }
    /**
     * Get author by ID
     */
    async getAuthorById(id) {
        const author = await models_1.Author.getById(id);
        if (!author) {
            throw new api_1.default(http_status_1.default.NOT_FOUND, 'Author not found');
        }
        const books = await models_1.Author.getBooksByAuthorId(id);
        return { ...author, books };
    }
    /**
     * Create a new author
     */
    async createAuthor(authorData) {
        return models_1.Author.create(authorData);
    }
    /**
     * Update author by ID
     */
    async updateAuthor(id, authorData) {
        const author = await models_1.Author.getById(id);
        if (!author) {
            throw new api_1.default(http_status_1.default.NOT_FOUND, 'Author not found');
        }
        const updatedAuthor = await models_1.Author.update(id, authorData);
        if (!updatedAuthor) {
            throw new api_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Failed to update author');
        }
        return updatedAuthor;
    }
    /**
     * Delete author by ID
     */
    async deleteAuthor(id) {
        const author = await models_1.Author.getById(id);
        if (!author) {
            throw new api_1.default(http_status_1.default.NOT_FOUND, 'Author not found');
        }
        const deletedCount = await models_1.Author.delete(id);
        if (deletedCount === 0) {
            throw new api_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Failed to delete author');
        }
    }
}
exports.default = new AuthorService();
