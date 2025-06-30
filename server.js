import path from 'node:path';
/// ────────────────────[external]────────────────────
import express from 'express';
import morgan from 'morgan';
/// ────────────────────[workspace]────────────────────
import { booksRouter } from './src/routes/routes.js';// CHECK
import { getDirName } from './src/utils/getDirName.js';// CHECK
import { ENV } from './src/config/environment.js';// CHECK

/// ────────────────────[other conf.]────────────────────
const __dirname = getDirName(import.meta.url);

/// ────────────────────[express conf.]────────────────────
const app = express();
app.disable('x-powered-by');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));
const API_PREFIX = '/home';

/// ────────────────────[middleware]────────────────────
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(API_PREFIX, booksRouter);

app.listen(ENV.PORT, () => console.log(`Server listening on port http://localhost:${ENV.PORT}${API_PREFIX}`));
