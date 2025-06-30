import { z } from 'zod';

export const bookSchemaZod = z.object({
  title: z.string().min(3).max(80),
  author: z.string().min(3).max(60),
  publishedYear: z.number().min(1600).max(new Date().getFullYear()),
  genre: z.array(z.string().min(3).max(60)).min(1).max(3)
}); // TODO
