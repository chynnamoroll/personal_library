const db = require('../config/db');

class AuthorRepository {
  findAll() {
    return db('authors').select('*').orderBy('name', 'asc');
  }

  findByIds(ids) {
    return db('authors').whereIn('id', ids).select('id');
  }
}

module.exports = new AuthorRepository();
