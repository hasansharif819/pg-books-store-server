"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../config/db"));
class Book {
    /**
     * Get paginated books with authors and sorting
     */
    static async getAllWithAuthors(page = 1, limit = 10, title = '', authorId, sortBy = 'title', sortOrder = 'asc') {
        const offset = (page - 1) * limit;
        // Base query with author join
        let query = (0, db_1.default)(this.table)
            .select('books.*', db_1.default.raw(`json_build_object(
          'id', authors.id,
          'name', authors.name,
          'bio', authors.bio,
          'birthdate', authors.birthdate
        ) as author`))
            .leftJoin('authors', 'books.author_id', 'authors.id')
            .where('books.title', 'ilike', `%${title}%`);
        if (authorId)
            query = query.where('books.author_id', authorId);
        // Validate and apply sorting
        const validSortColumns = ['title', 'published_date', 'created_at'];
        const validatedSortBy = validSortColumns.includes(sortBy) ? sortBy : 'title';
        query = query.orderBy(`books.${validatedSortBy}`, sortOrder);
        // Get total count - fixed count query
        const countQuery = (0, db_1.default)(this.table)
            .count('* as total')
            .leftJoin('authors', 'books.author_id', 'authors.id')
            .where('books.title', 'ilike', `%${title}%`);
        if (authorId)
            countQuery.where('books.author_id', authorId);
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
    static async getByIdWithAuthor(id) {
        const book = await (0, db_1.default)(this.table)
            .select('books.*', db_1.default.raw(`json_build_object(
          'id', authors.id,
          'name', authors.name,
          'bio', authors.bio,
          'birthdate', authors.birthdate
        ) as author`))
            .leftJoin('authors', 'books.author_id', 'authors.id')
            .where('books.id', id)
            .first();
        return book ? { ...book, author: book.author || undefined } : undefined;
    }
    /**
     * Basic CRUD operations
     */
    static async create(book) {
        // Ensure published_date is set
        const bookData = {
            ...book,
            published_date: book.published_date || new Date().toISOString().split('T')[0],
        };
        const [newBook] = await (0, db_1.default)(this.table).insert(bookData).returning('*');
        return newBook;
    }
    static async update(id, book) {
        const [updatedBook] = await (0, db_1.default)(this.table).where({ id }).update(book).returning('*');
        return updatedBook;
    }
    static async delete(id) {
        return (0, db_1.default)(this.table).where({ id }).del();
    }
}
Book.table = 'books';
exports.default = Book;
