import { Router } from 'express';
import {
  renderIndex,
  getBooksRepository,
  createBook
} from '../controllers/booksController.js';

export const booksRouter = Router();

booksRouter.get('/', renderIndex);
booksRouter.get('/books-repository', getBooksRepository);
booksRouter.post('/books', createBook);

booksRouter.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    error: 'Internal server error',
    message: error.message
  });
});
