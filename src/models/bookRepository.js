import crypto from 'node:crypto';
/// ────────────────────[workspace]────────────────────
import { BookSchemaDbLocal } from '../../db/local/schema/bookSchemaDbLocal.js';

export class BookRepositoryClass {
  static async createBook ({ title, author, publishedYear, genre }) {
    const bookExists = await BookSchemaDbLocal.findOne({ title, author });

    if (bookExists) {
      throw new Error('The book already exists');
    }

    const id = crypto.randomUUID();

    const bookCreated = await BookSchemaDbLocal.create({
      id,
      title,
      author,
      publishedYear,
      genre
    }).save();

    if (!bookCreated) {
      throw new Error('Error creating the book');
    }

    return {
      id: bookCreated.id,
      title: bookCreated.title,
      author: bookCreated.author,
      publishedYear: bookCreated.publishedYear,
      genre: bookCreated.genre
    };
  }

  static async getAllBooks () {
    return await BookSchemaDbLocal.find();
  }
}
