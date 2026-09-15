const db = require('../config/db');

class CategoryRepository {
  findAll() {
    return db('categories').select('*').orderBy('name', 'asc');
  }

  findById(id) {
    return db('categories').where({ id }).first();
  }
}

module.exports = new CategoryRepository();
