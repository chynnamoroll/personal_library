const authorRepository = require('../repositories/authorRepository');

class AuthorService {
  getAllAuthors() {
    return authorRepository.findAll();
  }
}

module.exports = new AuthorService();
