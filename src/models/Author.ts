import db from '../config/db';
import { IAuthor, IAuthorCreate, IAuthorUpdate } from '../interfaces/author';

class Author {
  static table = 'authors';

  /**
   * Get all authors with pagination
   */
  static async getAll(
    page: number = 1,
    limit: number = 10,
    search: string = '',
  ): Promise<IAuthor[]> {
    const offset = (page - 1) * limit;
    return db(this.table)
      .where('name', 'ilike', `%${search}%`)
      .offset(offset)
      .limit(limit)
      .select('*');
  }

  /**
   * Get author by ID
   */
  static async getById(id: number): Promise<IAuthor | undefined> {
    return db(this.table).where({ id }).first();
  }

  /**
   * Create a new author
   */
  static async create(author: IAuthorCreate): Promise<IAuthor> {
    const [newAuthor] = await db(this.table).insert(author).returning('*');
    return newAuthor;
  }

  /**
   * Update author by ID
   */
  static async update(id: number, author: IAuthorUpdate): Promise<IAuthor | undefined> {
    const [updatedAuthor] = await db(this.table).where({ id }).update(author).returning('*');
    return updatedAuthor;
  }

  /**
   * Delete author by ID
   */
  static async delete(id: number): Promise<number> {
    return db(this.table).where({ id }).del();
  }

  /**
   * Get books by author ID
   */
  static async getBooksByAuthorId(authorId: number): Promise<any[]> {
    return db('books').where({ author_id: authorId });
  }
}

export default Author;
