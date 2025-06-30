// Elementos DOM
const mainElement = document.getElementById('main');
const loadingElement = document.getElementById('loading');

// Función para mostrar/ocultar loading
const toggleLoading = (show = true) => {
  loadingElement.classList.toggle('hidden', !show);
  mainElement.classList.toggle('hidden', show);
};

// Función para crear el HTML de un libro
const createBookHTML = (book) => {
  // Validación de datos
  const title = book.title || 'Título no disponible';
  const author = book.author || 'Autor desconocido';
  const year = book.publishedYear || 'Año desconocido';
  const genre = book.genre || 'Género no especificado';

  return `
    <article data-id="${book.id}" class="book-card">
      <img src="/assets/book.jpg" alt="Portada de ${title}" loading="lazy">
      <div class="book-content">
        <h2>${title}</h2>
        <div class="book-meta">
          <span class="author">${author}</span>
          <div class="book-footer">
            <span class="year">${year}</span>
            <span class="genre">${genre}</span>
          </div>
        </div>
      </div>
    </article>
  `;
};

// Función para renderizar libros
const renderBooks = (books) => {
  if (!Array.isArray(books) || books.length === 0) {
    mainElement.innerHTML = '<p class="no-books">No se encontraron libros disponibles.</p>';
    return;
  }

  const booksHTML = books.map(createBookHTML).join('');
  mainElement.innerHTML = booksHTML;

  // Añadir eventos de click después de renderizar
  addBookClickEvents();
};

// Función para manejar clicks en libros
const addBookClickEvents = () => {
  const bookCards = document.querySelectorAll('.book-card');
  bookCards.forEach(card => {
    card.addEventListener('click', (event) => {
      const bookId = event.currentTarget.dataset.id;
      console.log(`Libro seleccionado: ${bookId}`);
      // Aquí puedes añadir la lógica para descargar o ver detalles del libro
    });
  });
};

// Función para manejar errores
const handleError = (error) => {
  console.error('Error al cargar los libros:', error);
  mainElement.innerHTML = `
    <div class="error-message">
      <h3>Error al cargar los libros</h3>
      <p>Por favor, intenta recargar la página.</p>
    </div>
  `;
};

// Función principal para obtener libros
const fetchBooks = async () => {
  try {
    toggleLoading(true);

    const response = await fetch('/home/books-repository');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const books = await response.json();
    renderBooks(books);
  } catch (error) {
    handleError(error);
  } finally {
    toggleLoading(false);
  }
};

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', fetchBooks);
