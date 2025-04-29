import { Author } from '../models';
import { IAuthor, IAuthorCreate, IAuthorUpdate, IAuthorWithBooks } from '../interfaces/author';
import ApiError from '../utils/api';
import httpStatus from 'http-status';

class AuthorService {
  /**
   * Get all authors
   */
  async getAllAuthors(
    page: number = 1,
    limit: number = 10,
    name: string = '',
    sortBy: string = 'name',
    sortOrder: 'asc' | 'desc' = 'asc',
  ) {
    const result = await Author.getAll(page, limit, name, sortBy, sortOrder);

    if (result.data.length === 0) {
      throw new ApiError(httpStatus.NOT_FOUND, 'No Author found');
    }

    return result;
  }

  /**
   * Get author by ID
   */
  async getAuthorById(id: number): Promise<IAuthorWithBooks> {
    const author = await Author.getById(id);
    if (!author) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Author not found');
    }

    const books = await Author.getBooksByAuthorId(id);
    return { ...author, books };
  }

  /**
   * Create a new author
   */
  async createAuthor(authorData: IAuthorCreate): Promise<IAuthor> {
    return Author.create(authorData);
  }

  /**
   * Update author by ID
   */
  async updateAuthor(id: number, authorData: IAuthorUpdate): Promise<IAuthor> {
    const author = await Author.getById(id);
    if (!author) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Author not found');
    }

    const updatedAuthor = await Author.update(id, authorData);
    if (!updatedAuthor) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to update author');
    }

    return updatedAuthor;
  }

  /**
   * Delete author by ID
   */
  async deleteAuthor(id: number): Promise<void> {
    const author = await Author.getById(id);
    if (!author) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Author not found');
    }

    const deletedCount = await Author.delete(id);
    if (deletedCount === 0) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to delete author');
    }
  }
}

export default new AuthorService();
