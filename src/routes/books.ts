import { Router } from 'express';
import bookController from '../controllers/books';
import validate from '../middlewares/validate';
import { bookCreateSchema, bookUpdateSchema } from '../validators/books';

const router = Router();

router.get('/', bookController.getBooks);
router.get('/:id', bookController.getBook);
// router.post('/', validate(bookCreateSchema), bookController.createBook);
router.post('/', bookController.createBook);
router.put('/:id', validate(bookUpdateSchema), bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

export default router;
