import { Router } from 'express';
import authors from './authors';
import books from './books';

const router = Router();

// API routes
router.use('/authors', authors);
router.use('/books', books);

export default router;
