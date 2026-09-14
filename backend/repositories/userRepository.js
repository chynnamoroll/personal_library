const db = require('../config/db');

class UserRepository {
  findByUsername(username) {
    return db('users').where({ username }).first();
  }
}

module.exports = new UserRepository();
