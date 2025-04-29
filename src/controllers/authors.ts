import { Request, Response } from 'express';
import authorService from '../services/authors';
import { pick } from 'lodash';
import httpStatus from 'http-status';

class AuthorController {
  /**
   * Get all authors
   */
  async getAuthors(req: Request, res: Response): Promise<void> {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = (req.query.search as string) || '';

    const authors = await authorService.getAllAuthors(page, limit, search);
    res.status(httpStatus.OK).json(authors);
  }

  /**
   * Get author by ID
   */
  async getAuthor(req: Request, res: Response): Promise<void> {
    const authorId = parseInt(req.params.id);
    const author = await authorService.getAuthorById(authorId);
    res.status(httpStatus.OK).json(author);
  }

  /**
   * Create a new author
   */
  async createAuthor(req: Request, res: Response): Promise<void> {
    const authorData = pick(req.body, ['name', 'bio', 'birthdate']);
    const newAuthor = await authorService.createAuthor(authorData);
    res.status(httpStatus.CREATED).json(newAuthor);
  }

  /**
   * Update author by ID
   */
  async updateAuthor(req: Request, res: Response): Promise<void> {
    const authorId = parseInt(req.params.id);
    const authorData = pick(req.body, ['name', 'bio', 'birthdate']);
    const updatedAuthor = await authorService.updateAuthor(authorId, authorData);
    res.status(httpStatus.OK).json(updatedAuthor);
  }

  /**
   * Delete author by ID
   */
  async deleteAuthor(req: Request, res: Response): Promise<void> {
    const authorId = parseInt(req.params.id);
    await authorService.deleteAuthor(authorId);
    res.status(httpStatus.NO_CONTENT).send();
  }
}

export default new AuthorController();
