import { Router } from 'express';
import authors from './authors';
import books from './books';

const router = Router();

// Health check endpoint
// router.get('/health', (req, res) => res.status(200).json({ status: 'OK' }));

// API routes
router.use('/authors', authors);
router.use('/books', books);

export default router;
