import DbLocal from 'db-local';

const { Schema } = new DbLocal({ path: 'db/local/db-local' });

export const BookSchemaDbLocal = Schema('BookSchemaDbLocal', {
  id: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  publishedYear: {
    type: Number,
    required: true
  },
  genre: {
    type: [String],
    required: true
  }
});
