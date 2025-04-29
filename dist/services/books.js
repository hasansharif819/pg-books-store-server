"use strict";
// import { Book } from '../models';
// import { IBook, IBookCreate, IBookUpdate, IBookWithAuthor } from '../interfaces/book';
// import ApiError from '../utils/api';
// import httpStatus from 'http-status';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// class BookService {
//   /**
//    * Get paginated books with filtering and sorting
//    */
//   async getAllBooks(
//     page: number = 1,
//     limit: number = 10,
//     title: string = '',
//     authorId?: number,
//     sortBy: string = 'title',
//     sortOrder: 'asc' | 'desc' = 'asc',
//   ) {
//     return Book.getAllWithAuthors(page, limit, title, authorId, sortBy, sortOrder);
//   }
//   /**
//    * Get book by ID with author details
//    */
//   async getBookById(id: number): Promise<IBookWithAuthor> {
//     const book = await Book.getByIdWithAuthor(id);
//     if (!book) throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
//     return book;
//   }
//   /**
//    * Create a new book
//    */
//   async createBook(bookData: IBookCreate): Promise<IBook> {
//     return Book.create(bookData);
//   }
//   /**
//    * Update book
//    */
//   async updateBook(id: number, bookData: IBookUpdate): Promise<IBook> {
//     const updatedBook = await Book.update(id, bookData);
//     if (!updatedBook) throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
//     return updatedBook;
//   }
//   /**
//    * Delete book
//    */
//   async deleteBook(id: number): Promise<void> {
//     const deletedCount = await Book.delete(id);
//     if (deletedCount === 0) throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
//   }
// }
// export default new BookService();
const models_1 = require("../models");
const apiError_1 = __importDefault(require("../utils/apiError"));
const http_status_1 = __importDefault(require("http-status"));
class BookService {
    async getAllBooks(page = 1, limit = 10, search = '', authorId, sortBy = 'title', sortOrder = 'asc') {
        const result = await models_1.Book.getAllWithAuthors(page, limit, search, authorId, sortBy, sortOrder);
        if (result.data.length === 0) {
            throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'No books found');
        }
        return result;
    }
    async getBookById(id) {
        const book = await models_1.Book.getByIdWithAuthor(id);
        if (!book) {
            throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Book not found');
        }
        return book;
    }
    async createBook(bookData) {
        // Set default published_date if not provided
        if (!bookData.published_date) {
            bookData.published_date = new Date();
        }
        try {
            return await models_1.Book.create(bookData);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to create book';
            throw new apiError_1.default(http_status_1.default.BAD_REQUEST, message);
        }
    }
    async updateBook(id, bookData) {
        const updatedBook = await models_1.Book.update(id, bookData);
        if (!updatedBook) {
            throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Book not found');
        }
        return updatedBook;
    }
    async deleteBook(id) {
        const deletedCount = await models_1.Book.delete(id);
        if (deletedCount === 0) {
            throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Book not found');
        }
    }
}
exports.default = new BookService();
