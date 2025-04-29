import { Request, Response } from 'express';
import bookService from '../services/books';
import { pick } from 'lodash';
import sendResponse from '@/utils/sendResponse';
import httpStatus from 'http-status';

class BookController {
  async getBooks(req: Request, res: Response) {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string))) || 10;
    const search = (req.query.search as string) || '';
    const authorId = req.query.author ? parseInt(req.query.author as string) : undefined;
    const sortBy = ['title', 'published_date', 'created_at'].includes(req.query.sortBy as string)
      ? (req.query.sortBy as string)
      : 'title';
    const sortOrder = req.query.sortOrder === 'desc' ? 'desc' : 'asc';

    const result = await bookService.getAllBooks(page, limit, search, authorId, sortBy, sortOrder);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Books are fetched successfully',
      data: result.data,
      meta: result.meta,
    });
  }

  async getBook(req: Request, res: Response) {
    const book = await bookService.getBookById(parseInt(req.params.id));
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Book is fetched successfully',
      data: book,
    });
  }

  async createBook(req: Request, res: Response) {
    const bookData = pick(req.body, ['title', 'description', 'published_date', 'author_id']);
    const newBook = await bookService.createBook(bookData);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Book created successfully',
      data: newBook,
    });
  }

  async updateBook(req: Request, res: Response) {
    const updatedBook = await bookService.updateBook(
      parseInt(req.params.id),
      pick(req.body, ['title', 'description', 'published_date', 'author_id']),
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Book is updated successfully',
      data: updatedBook,
    });
  }

  async deleteBook(req: Request, res: Response) {
    await bookService.deleteBook(parseInt(req.params.id));
    sendResponse(res, {
      statusCode: httpStatus.NO_CONTENT,
      success: true,
      message: 'Book is deleted successfully',
    });
  }
}

export default new BookController();
