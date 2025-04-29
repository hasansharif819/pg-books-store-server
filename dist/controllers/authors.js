"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authors_1 = __importDefault(require("../services/authors"));
const lodash_1 = require("lodash");
const http_status_1 = __importDefault(require("http-status"));
class AuthorController {
    /**
     * Get all authors
     */
    async getAuthors(req, res) {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || '';
        const authors = await authors_1.default.getAllAuthors(page, limit, search);
        res.status(http_status_1.default.OK).json(authors);
    }
    /**
     * Get author by ID
     */
    async getAuthor(req, res) {
        const authorId = parseInt(req.params.id);
        const author = await authors_1.default.getAuthorById(authorId);
        res.status(http_status_1.default.OK).json(author);
    }
    /**
     * Create a new author
     */
    async createAuthor(req, res) {
        const authorData = (0, lodash_1.pick)(req.body, ['name', 'bio', 'birthdate']);
        const newAuthor = await authors_1.default.createAuthor(authorData);
        res.status(http_status_1.default.CREATED).json(newAuthor);
    }
    /**
     * Update author by ID
     */
    async updateAuthor(req, res) {
        const authorId = parseInt(req.params.id);
        const authorData = (0, lodash_1.pick)(req.body, ['name', 'bio', 'birthdate']);
        const updatedAuthor = await authors_1.default.updateAuthor(authorId, authorData);
        res.status(http_status_1.default.OK).json(updatedAuthor);
    }
    /**
     * Delete author by ID
     */
    async deleteAuthor(req, res) {
        const authorId = parseInt(req.params.id);
        await authors_1.default.deleteAuthor(authorId);
        res.status(http_status_1.default.NO_CONTENT).send();
    }
}
exports.default = new AuthorController();
