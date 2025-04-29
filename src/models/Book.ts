import db from '../config/db';
import { IBook, IBookCreate, IBookUpdate } from '../interfaces/book';

class Book {
  static table = 'books';

  /**
   * Get all books with pagination
   */
  static async getAll(
    page: number = 1,
    limit: number = 10,
    search: string = '',
    authorId?: number,
  ): Promise<IBook[]> {
    const offset = (page - 1) * limit;
    const query = db(this.table).where('title', 'ilike', `%${search}%`).offset(offset).limit(limit);

    if (authorId) {
      query.where({ author_id: authorId });
    }

    return query.select('*');
  }

  /**
   * Get book by ID
   */
  static async getById(id: number): Promise<IBook | undefined> {
    return db(this.table).where({ id }).first();
  }

  /**
   * Create a new book
   */
  static async create(book: IBookCreate): Promise<IBook> {
    const [newBook] = await db(this.table).insert(book).returning('*');
    return newBook;
  }

  /**
   * Update book by ID
   */
  static async update(id: number, book: IBookUpdate): Promise<IBook | undefined> {
    const [updatedBook] = await db(this.table).where({ id }).update(book).returning('*');
    return updatedBook;
  }

  /**
   * Delete book by ID
   */
  static async delete(id: number): Promise<number> {
    return db(this.table).where({ id }).del();
  }

  /**
   * Get author of a book
   */
  static async getAuthor(bookId: number): Promise<any> {
    return db('authors')
      .join('books', 'authors.id', 'books.author_id')
      .where('books.id', bookId)
      .select('authors.*')
      .first();
  }
}

export default Book;
