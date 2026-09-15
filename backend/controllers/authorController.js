const authorService = require('../services/authorService');

class AuthorController {
  async list(req, res) {
    try {
      const authors = await authorService.getAllAuthors();
      return res.status(200).json(authors);
    } catch (error) {
      return res.status(500).json({ message: 'Something went wrong while fetching authors' });
    }
  }
}

module.exports = new AuthorController();
