import db from '../config/db';
import { IAuthor, IAuthorCreate, IAuthorUpdate, IAuthorWithBooks } from '../interfaces/author';

class Author {
  static table = 'authors';

  /**
   * Get all authors with pagination
   */
  static async getAll(
    page: number = 1,
    limit: number = 10,
    name: string = '',
    sortBy: string = 'name',
    sortOrder: 'asc' | 'desc' = 'asc',
  ): Promise<{
    data: IAuthorWithBooks[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  }> {
    const offset = (page - 1) * limit;

    // Base query with books join
    let query = db(this.table)
      .select(
        'authors.*',
        db.raw(`
          COALESCE(
            json_agg(
              json_build_object(
                'id', books.id,
                'title', books.title,
                'description', books.description,
                'published_date', books.published_date
              )
            ) FILTER (WHERE books.id IS NOT NULL),
            '[]'
          ) as books
        `),
      )
      .leftJoin('books', 'authors.id', 'books.author_id')
      .where('authors.name', 'ilike', `%${name}%`)
      .groupBy('authors.id');

    // Validate and apply sorting
    const validSortColumns = ['name', 'birthdate', 'created_at'];
    const validatedSortBy = validSortColumns.includes(sortBy) ? sortBy : 'name';
    query = query.orderBy(`authors.${validatedSortBy}`, sortOrder);

    // Get total count
    const countQuery = db(this.table).count('* as total').where('name', 'ilike', `%${name}%`);

    // Execute queries in parallel
    const [countResult, authors] = await Promise.all([
      countQuery.first(),
      query.offset(offset).limit(limit),
    ]);

    const total = Number(countResult?.total) || 0;

    return {
      data: authors.map((author) => ({
        ...author,
        books: author.books || [],
      })),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
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
