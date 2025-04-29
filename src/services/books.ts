import { Book } from '../models';
import { IBook, IBookCreate, IBookUpdate, IBookWithAuthor } from '../interfaces/book';
import ApiError from '../utils/apiError';
import httpStatus from 'http-status';

class BookService {
  async getAllBooks(
    page: number = 1,
    limit: number = 10,
    search: string = '',
    authorId?: number,
    sortBy: string = 'title',
    sortOrder: 'asc' | 'desc' = 'asc',
  ) {
    const result = await Book.getAllWithAuthors(page, limit, search, authorId, sortBy, sortOrder);

    if (result.data.length === 0) {
      throw new ApiError(httpStatus.NOT_FOUND, 'No books found');
    }

    return result;
  }

  async getBookById(id: number): Promise<IBookWithAuthor> {
    const book = await Book.getByIdWithAuthor(id);
    if (!book) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
    }
    return book;
  }

  async createBook(bookData: IBookCreate): Promise<IBook> {
    // Set default published_date if not provided
    if (!bookData.published_date) {
      bookData.published_date = new Date();
    }

    try {
      return await Book.create(bookData);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create book';
      throw new ApiError(httpStatus.BAD_REQUEST, message);
    }
  }

  async updateBook(id: number, bookData: IBookUpdate): Promise<IBook> {
    const updatedBook = await Book.update(id, bookData);
    if (!updatedBook) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
    }
    return updatedBook;
  }

  async deleteBook(id: number): Promise<void> {
    const deletedCount = await Book.delete(id);
    if (deletedCount === 0) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
    }
  }
}

export default new BookService();
