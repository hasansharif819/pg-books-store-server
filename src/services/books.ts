import { Book } from '../models';
import { IBook, IBookCreate, IBookUpdate, IBookWithAuthor } from '../interfaces/book';
import ApiError from '../utils/api';
import httpStatus from 'http-status';

class BookService {
  /**
   * Get all books
   */
  async getAllBooks(
    page: number,
    limit: number,
    search: string,
    authorId?: number,
  ): Promise<IBook[]> {
    return Book.getAll(page, limit, search, authorId);
  }

  /**
   * Get book by ID
   */
  async getBookById(id: number): Promise<IBookWithAuthor> {
    const book = await Book.getById(id);
    if (!book) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
    }

    const author = await Book.getAuthor(id);
    return { ...book, author };
  }

  /**
   * Create a new book
   */
  async createBook(bookData: IBookCreate): Promise<IBook> {
    return Book.create(bookData);
  }

  /**
   * Update book by ID
   */
  async updateBook(id: number, bookData: IBookUpdate): Promise<IBook> {
    const book = await Book.getById(id);
    if (!book) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
    }

    const updatedBook = await Book.update(id, bookData);
    if (!updatedBook) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to update book');
    }

    return updatedBook;
  }

  /**
   * Delete book by ID
   */
  async deleteBook(id: number): Promise<void> {
    const book = await Book.getById(id);
    if (!book) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
    }

    const deletedCount = await Book.delete(id);
    if (deletedCount === 0) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to delete book');
    }
  }
}

export default new BookService();
