"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authors_1 = __importDefault(require("../services/authors"));
const lodash_1 = require("lodash");
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("@/utils/sendResponse"));
class AuthorController {
    /**
     * Get all authors
     */
    // async getAuthors(req: Request, res: Response): Promise<void> {
    //   const page = parseInt(req.query.page as string) || 1;
    //   const limit = parseInt(req.query.limit as string) || 10;
    //   const search = (req.query.search as string) || '';
    //   const authors = await authorService.getAllAuthors(page, limit, search);
    //   // res.status(httpStatus.OK).json(authors);
    //   sendResponse(res, {
    //     statusCode: httpStatus.CREATED,
    //     success: true,
    //     message: 'Books are fetched successfully',
    //     data: result.data,
    //     meta: result.meta,
    //   });
    // }
    async getAuthors(req, res) {
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const limit = Math.min(100, Math.max(1, parseInt(req.query.limit))) || 10;
        const name = req.query.name || '';
        const sortBy = ['title', 'published_date', 'created_at'].includes(req.query.sortBy)
            ? req.query.sortBy
            : 'title';
        const sortOrder = req.query.sortOrder === 'desc' ? 'desc' : 'asc';
        const result = await authors_1.default.getAllAuthors(page, limit, name, sortBy, sortOrder);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.CREATED,
            success: true,
            message: 'Books are fetched successfully',
            data: result.data,
            meta: result.meta,
        });
    }
    /**
     * Get author by ID
     */
    async getAuthor(req, res) {
        const authorId = parseInt(req.params.id);
        const author = await authors_1.default.getAuthorById(authorId);
        // res.status(httpStatus.OK).json(author);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.CREATED,
            success: true,
            message: 'Author is fetched successfully',
            data: author,
        });
    }
    /**
     * Create a new author
     */
    async createAuthor(req, res) {
        const authorData = (0, lodash_1.pick)(req.body, ['name', 'bio', 'birthdate']);
        const newAuthor = await authors_1.default.createAuthor(authorData);
        // res.status(httpStatus.CREATED).json(newAuthor);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.CREATED,
            success: true,
            message: 'Author is created successfully',
            data: newAuthor,
        });
    }
    /**
     * Update author by ID
     */
    async updateAuthor(req, res) {
        const authorId = parseInt(req.params.id);
        const authorData = (0, lodash_1.pick)(req.body, ['name', 'bio', 'birthdate']);
        const updatedAuthor = await authors_1.default.updateAuthor(authorId, authorData);
        // res.status(httpStatus.OK).json(updatedAuthor);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.CREATED,
            success: true,
            message: 'Author is updated successfully',
            data: updatedAuthor,
        });
    }
    /**
     * Delete author by ID
     */
    async deleteAuthor(req, res) {
        const authorId = parseInt(req.params.id);
        await authors_1.default.deleteAuthor(authorId);
        // res.status(httpStatus.NO_CONTENT).send();
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.CREATED,
            success: true,
            message: 'Author is deleted successfully',
        });
    }
}
exports.default = new AuthorController();
