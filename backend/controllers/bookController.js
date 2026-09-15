const bookService = require('../services/bookService');
const ValidationError = require('../utils/ValidationError');

const INVALID_UUID_CODE = '22P02';

class BookController {
  async list(req, res) {
    try {
      const categoryId = req.query.categoryId !== undefined ? Number(req.query.categoryId) : undefined;
      const authorId = req.query.authorId !== undefined ? Number(req.query.authorId) : undefined;

      if ((categoryId !== undefined && Number.isNaN(categoryId)) || (authorId !== undefined && Number.isNaN(authorId))) {
        return res.status(400).json({ message: 'categoryId and authorId must be numbers' });
      }

      const books = await bookService.getAllBooks({ categoryId, authorId });
      return res.status(200).json(books);
    } catch (error) {
      return res.status(500).json({ message: 'Something went wrong while fetching books' });
    }
  }

  async getById(req, res) {
    try {
      const book = await bookService.getBookById(req.params.id);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
      return res.status(200).json(book);
    } catch (error) {
      if (error.code === INVALID_UUID_CODE) {
        return res.status(404).json({ message: 'Book not found' });
      }
      return res.status(500).json({ message: 'Something went wrong while fetching the book' });
    }
  }

  async create(req, res) {
    const { title, categoryId, authorIds } = req.body || {};

    if (!title || !categoryId || !Array.isArray(authorIds) || authorIds.length === 0) {
      return res.status(400).json({ message: 'title, categoryId and authorIds are required' });
    }

    try {
      const book = await bookService.createBook(req.body);
      return res.status(201).json(book);
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Something went wrong while creating the book' });
    }
  }

  async remove(req, res) {
    try {
      const deleted = await bookService.deleteBook(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: 'Book not found' });
      }
      return res.status(204).send();
    } catch (error) {
      if (error.code === INVALID_UUID_CODE) {
        return res.status(404).json({ message: 'Book not found' });
      }
      return res.status(500).json({ message: 'Something went wrong while deleting the book' });
    }
  }
}

module.exports = new BookController();
