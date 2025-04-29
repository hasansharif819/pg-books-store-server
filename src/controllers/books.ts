import { Request, Response } from 'express';
import bookService from '../services/books';
import { pick } from 'lodash';
import httpStatus from 'http-status';

class BookController {
  /**
   * Get paginated and filtered books
   */
  async getBooks(req: Request, res: Response) {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string))) || 10;
    const title = (req.query.title as string) || '';
    const authorId = req.query.author ? parseInt(req.query.author as string) : undefined;
    const sortBy = ['title', 'published_date', 'created_at'].includes(req.query.sortBy as string)
      ? (req.query.sortBy as string)
      : 'title';
    const sortOrder = req.query.sortOrder === 'desc' ? 'desc' : 'asc';

    const result = await bookService.getAllBooks(page, limit, title, authorId, sortBy, sortOrder);

    res.status(httpStatus.OK).json(result);
  }

  /**
   * Get single book with author details
   */
  async getBook(req: Request, res: Response) {
    const book = await bookService.getBookById(parseInt(req.params.id));
    res.status(httpStatus.OK).json(book);
  }

  /**
   * Create new book
   */
  async createBook(req: Request, res: Response) {
    const bookData = pick(req.body, ['title', 'description', 'published_date', 'author_id']);
    const newBook = await bookService.createBook(bookData);
    res.status(httpStatus.CREATED).json(newBook);
  }

  /**
   * Update book
   */
  async updateBook(req: Request, res: Response) {
    const updatedBook = await bookService.updateBook(
      parseInt(req.params.id),
      pick(req.body, ['title', 'description', 'published_date', 'author_id']),
    );
    res.status(httpStatus.OK).json(updatedBook);
  }

  /**
   * Delete book
   */
  async deleteBook(req: Request, res: Response) {
    await bookService.deleteBook(parseInt(req.params.id));
    res.status(httpStatus.NO_CONTENT).send();
  }
}

export default new BookController();
