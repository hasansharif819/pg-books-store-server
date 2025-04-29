import { Router } from 'express';
import authorController from '../controllers/authors';
import { authorCreateSchema, authorUpdateSchema } from '../validators/authors';
import validate from '../middlewares/validate';

const router = Router();

router.get('/', authorController.getAuthors);
router.get('/:id', authorController.getAuthor);
router.post('/', validate(authorCreateSchema), authorController.createAuthor);
router.put('/:id', validate(authorUpdateSchema), authorController.updateAuthor);
router.delete('/:id', authorController.deleteAuthor);

export default router;
