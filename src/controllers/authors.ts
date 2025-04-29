import { Request, Response } from 'express';
import authorService from '../services/authors';
import { pick } from 'lodash';
import httpStatus from 'http-status';
import sendResponse from '@/utils/sendResponse';

class AuthorController {
  /**
   * Get all authors
   */
  async getAuthors(req: Request, res: Response) {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string))) || 10;
    const name = (req.query.name as string) || '';
    const sortBy = ['title', 'published_date', 'created_at'].includes(req.query.sortBy as string)
      ? (req.query.sortBy as string)
      : 'title';
    const sortOrder = req.query.sortOrder === 'desc' ? 'desc' : 'asc';

    const result = await authorService.getAllAuthors(page, limit, name, sortBy, sortOrder);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Authors are fetched successfully',
      data: result.data,
      meta: result.meta,
    });
  }

  /**
   * Get author by ID
   */
  async getAuthor(req: Request, res: Response): Promise<void> {
    const authorId = parseInt(req.params.id);
    const author = await authorService.getAuthorById(authorId);
    // res.status(httpStatus.OK).json(author);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Author is fetched successfully',
      data: author,
    });
  }

  /**
   * Create a new author
   */
  async createAuthor(req: Request, res: Response): Promise<void> {
    const authorData = pick(req.body, ['name', 'bio', 'birthdate']);
    const newAuthor = await authorService.createAuthor(authorData);
    // res.status(httpStatus.CREATED).json(newAuthor);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Author is created successfully',
      data: newAuthor,
    });
  }

  /**
   * Update author by ID
   */
  async updateAuthor(req: Request, res: Response): Promise<void> {
    const authorId = parseInt(req.params.id);
    const authorData = pick(req.body, ['name', 'bio', 'birthdate']);
    const updatedAuthor = await authorService.updateAuthor(authorId, authorData);
    // res.status(httpStatus.OK).json(updatedAuthor);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Author is updated successfully',
      data: updatedAuthor,
    });
  }

  /**
   * Delete author by ID
   */
  async deleteAuthor(req: Request, res: Response): Promise<void> {
    const authorId = parseInt(req.params.id);
    await authorService.deleteAuthor(authorId);
    sendResponse(res, {
      statusCode: httpStatus.NO_CONTENT,
      success: true,
      message: 'Author is deleted successfully',
    });
  }
}

export default new AuthorController();
