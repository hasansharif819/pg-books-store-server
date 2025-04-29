import { Book } from '../models';
import { IBook, IBookCreate, IBookUpdate, IBookWithAuthor } from '../interfaces/book';
import ApiError from '../utils/api';
import httpStatus from 'http-status';

class BookService {
  /**
   * Get paginated books with filtering and sorting
   */
  async getAllBooks(
    page: number = 1,
    limit: number = 10,
    title: string = '',
    authorId?: number,
    sortBy: string = 'title',
    sortOrder: 'asc' | 'desc' = 'asc',
  ) {
    return Book.getAllWithAuthors(page, limit, title, authorId, sortBy, sortOrder);
  }

  /**
   * Get book by ID with author details
   */
  async getBookById(id: number): Promise<IBookWithAuthor> {
    const book = await Book.getByIdWithAuthor(id);
    if (!book) throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
    return book;
  }

  /**
   * Create a new book
   */
  async createBook(bookData: IBookCreate): Promise<IBook> {
    return Book.create(bookData);
  }

  /**
   * Update book
   */
  async updateBook(id: number, bookData: IBookUpdate): Promise<IBook> {
    const updatedBook = await Book.update(id, bookData);
    if (!updatedBook) throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
    return updatedBook;
  }

  /**
   * Delete book
   */
  async deleteBook(id: number): Promise<void> {
    const deletedCount = await Book.delete(id);
    if (deletedCount === 0) throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
  }
}

export default new BookService();
