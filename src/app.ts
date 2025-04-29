import express from 'express';
import cors from 'cors';
import routes from './routes';
import { errorConverter, errorHandler } from './middlewares/error';
import httpStatus from 'http-status';
import ApiError from './utils/api';
import authors from './routes/authors';
import books from './routes/books';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route (before main routes)
app.get('/ping', (req, res) => {
  res.status(200).json({ message: 'pong' });
});

// Main API routes
// app.use('/api', routes); // Changed from app.use('/', routes)
app.use('/authors', authors);
app.use('/books', books);

// 404 handler (must come AFTER all other routes)
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// Error handlers (must come after all other middleware)
app.use(errorConverter);
app.use(errorHandler);

export default app;
