import { Request, Response } from 'express';
import bookService from '../services/books';
import { pick } from 'lodash';
import httpStatus from 'http-status';

class BookController {
  /**
   * Get all books
   */
  async getBooks(req: Request, res: Response): Promise<void> {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = (req.query.search as string) || '';
    const authorId = req.query.author ? parseInt(req.query.author as string) : undefined;

    const books = await bookService.getAllBooks(page, limit, search, authorId);
    res.status(httpStatus.OK).json(books);
  }

  /**
   * Get book by ID
   */
  async getBook(req: Request, res: Response): Promise<void> {
    const bookId = parseInt(req.params.id);
    const book = await bookService.getBookById(bookId);
    res.status(httpStatus.OK).json(book);
  }

  /**
   * Create a new book
   */
  async createBook(req: Request, res: Response) {
    const bookData = {
      title: req.body.title,
      description: req.body.description,
      published_date: req.body.publishedDate, // Map to database column name
      author_id: req.body.author_id,
    };

    const newBook = await bookService.createBook(bookData);
    res.status(201).json(newBook);
  }

  /**
   * Update book by ID
   */
  async updateBook(req: Request, res: Response): Promise<void> {
    const bookId = parseInt(req.params.id);
    const bookData = pick(req.body, ['title', 'description', 'published_date', 'author_id']);
    const updatedBook = await bookService.updateBook(bookId, bookData);
    res.status(httpStatus.OK).json(updatedBook);
  }

  /**
   * Delete book by ID
   */
  async deleteBook(req: Request, res: Response): Promise<void> {
    const bookId = parseInt(req.params.id);
    await bookService.deleteBook(bookId);
    res.status(httpStatus.NO_CONTENT).send();
  }
}

export default new BookController();
