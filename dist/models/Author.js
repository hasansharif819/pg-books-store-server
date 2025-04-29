"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../config/db"));
class Author {
    /**
     * Get all authors with pagination
     */
    // static async getAll(
    //   page: number = 1,
    //   limit: number = 10,
    //   search: string = '',
    // ): Promise<IAuthor[]> {
    //   const offset = (page - 1) * limit;
    //   return db(this.table)
    //     .where('name', 'ilike', `%${search}%`)
    //     .offset(offset)
    //     .limit(limit)
    //     .select('*');
    // }
    static async getAll(page = 1, limit = 10, name = '', sortBy = 'name', sortOrder = 'asc') {
        const offset = (page - 1) * limit;
        // Base query with books join
        let query = (0, db_1.default)(this.table)
            .select('authors.*', db_1.default.raw(`
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
        `))
            .leftJoin('books', 'authors.id', 'books.author_id')
            .where('authors.name', 'ilike', `%${name}%`)
            .groupBy('authors.id');
        // Validate and apply sorting
        const validSortColumns = ['name', 'birthdate', 'created_at'];
        const validatedSortBy = validSortColumns.includes(sortBy) ? sortBy : 'name';
        query = query.orderBy(`authors.${validatedSortBy}`, sortOrder);
        // Get total count
        const countQuery = (0, db_1.default)(this.table).count('* as total').where('name', 'ilike', `%${name}%`);
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
    static async getById(id) {
        return (0, db_1.default)(this.table).where({ id }).first();
    }
    /**
     * Create a new author
     */
    static async create(author) {
        const [newAuthor] = await (0, db_1.default)(this.table).insert(author).returning('*');
        return newAuthor;
    }
    /**
     * Update author by ID
     */
    static async update(id, author) {
        const [updatedAuthor] = await (0, db_1.default)(this.table).where({ id }).update(author).returning('*');
        return updatedAuthor;
    }
    /**
     * Delete author by ID
     */
    static async delete(id) {
        return (0, db_1.default)(this.table).where({ id }).del();
    }
    /**
     * Get books by author ID
     */
    static async getBooksByAuthorId(authorId) {
        return (0, db_1.default)('books').where({ author_id: authorId });
    }
}
Author.table = 'authors';
exports.default = Author;
