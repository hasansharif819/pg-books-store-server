import db from '../config/db';
import { IBook, IBookCreate, IBookUpdate, IBookWithAuthor } from '../interfaces/book';

class Book {
  static table = 'books';

  /**
   * Get paginated books with authors and sorting
   */
  static async getAllWithAuthors(
    page: number = 1,
    limit: number = 10,
    title: string = '',
    authorId?: number,
    sortBy: string = 'title',
    sortOrder: 'asc' | 'desc' = 'asc',
  ): Promise<{
    data: IBookWithAuthor[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  }> {
    const offset = (page - 1) * limit;

    // Base query with author join
    let query = db(this.table)
      .select(
        'books.*',
        db.raw(`json_build_object(
          'id', authors.id,
          'name', authors.name,
          'bio', authors.bio,
          'birthdate', authors.birthdate
        ) as author`),
      )
      .leftJoin('authors', 'books.author_id', 'authors.id')
      .where('books.title', 'ilike', `%${title}%`);

    if (authorId) query = query.where('books.author_id', authorId);

    // Validate and apply sorting
    const validSortColumns = ['title', 'published_date', 'created_at'];
    const validatedSortBy = validSortColumns.includes(sortBy) ? sortBy : 'title';
    query = query.orderBy(`books.${validatedSortBy}`, sortOrder);

    // Get total count - fixed count query
    const countQuery = db(this.table)
      .count('* as total')
      .leftJoin('authors', 'books.author_id', 'authors.id')
      .where('books.title', 'ilike', `%${title}%`);

    if (authorId) countQuery.where('books.author_id', authorId);

    // Execute queries in parallel
    const [countResult, books] = await Promise.all([
      countQuery.first(),
      query.offset(offset).limit(limit),
    ]);

    const total = Number(countResult?.total) || 0;

    return {
      data: books.map((book) => ({
        ...book,
        author: book.author || undefined,
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
   * Get book by ID with author
   */
  static async getByIdWithAuthor(id: number): Promise<IBookWithAuthor | undefined> {
    const book = await db(this.table)
      .select(
        'books.*',
        db.raw(`json_build_object(
          'id', authors.id,
          'name', authors.name,
          'bio', authors.bio,
          'birthdate', authors.birthdate
        ) as author`),
      )
      .leftJoin('authors', 'books.author_id', 'authors.id')
      .where('books.id', id)
      .first();

    return book ? { ...book, author: book.author || undefined } : undefined;
  }

  /**
   * Basic CRUD operations
   */
  static async create(book: IBookCreate): Promise<IBook> {
    // Ensure published_date is set
    const bookData = {
      ...book,
      published_date: book.published_date || new Date().toISOString().split('T')[0],
    };

    const [newBook] = await db(this.table).insert(bookData).returning('*');
    return newBook;
  }

  static async update(id: number, book: IBookUpdate): Promise<IBook | undefined> {
    const [updatedBook] = await db(this.table).where({ id }).update(book).returning('*');
    return updatedBook;
  }

  static async delete(id: number): Promise<number> {
    return db(this.table).where({ id }).del();
  }
}

export default Book;
