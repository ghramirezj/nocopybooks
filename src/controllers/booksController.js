import { bookSchemaZod } from '../schema/bookSchemaZod.js';
import { BookRepositoryClass } from '../models/bookRepository.js';

export const renderIndex = (req, res) => {
  try {
    res.render('index');
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });

    console.error('Error rendering index:', error);
  }
};

export const getBooksRepository = async (req, res, next) => {
  try {
    const books = await BookRepositoryClass.getAllBooks();

    res.json(books);
  } catch (error) {
    next(error);
  }
};

export const createBook = async (req, res, next) => {
  try {
    const validateBody = await bookSchemaZod.parseAsync(req.body);

    const bookCreated = await BookRepositoryClass.createBook(validateBody);

    res.status(201).json({
      message: 'Book successfully created',
      book: bookCreated
    });
  } catch (error) {
    if (error.name === 'ZodError') {
      console.error('Zod validation error:', error.errors);
      return res.status(400).json({ error: 'Invalid data', details: error.errors });
    }

    if (error.message === 'The book already exists') {
      return res.status(409).json({ error: error.message });
    }

    if (error.message === 'Error creating the book') {
      return res.status(500).json({ error: error.message });
    }

    console.error('Error:', error);

    next(error);
  }
};
