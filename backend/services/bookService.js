const bookRepository = require('../repositories/bookRepository');
const categoryRepository = require('../repositories/categoryRepository');
const authorRepository = require('../repositories/authorRepository');
const ValidationError = require('../utils/ValidationError');

class BookService {
  getAllBooks({ categoryId, authorId } = {}) {
    return bookRepository.findAll({ categoryId, authorId });
  }

  getBookById(id) {
    return bookRepository.findById(id);
  }

  async createBook(data) {
    const category = await categoryRepository.findById(data.categoryId);
    if (!category) {
      throw new ValidationError('categoryId does not reference an existing category');
    }

    const authorIds = Array.isArray(data.authorIds) ? [...new Set(data.authorIds)] : [];
    if (authorIds.length === 0) {
      throw new ValidationError('At least one authorId is required');
    }

    const foundAuthors = await authorRepository.findByIds(authorIds);
    if (foundAuthors.length !== authorIds.length) {
      throw new ValidationError('One or more authorIds do not reference an existing author');
    }

    const book = await bookRepository.create({ ...data, authorIds });
    return bookRepository.findById(book.id);
  }

  deleteBook(id) {
    return bookRepository.delete(id);
  }
}

module.exports = new BookService();
