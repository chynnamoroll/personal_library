const categoryRepository = require('../repositories/categoryRepository');

class CategoryService {
  getAllCategories() {
    return categoryRepository.findAll();
  }
}

module.exports = new CategoryService();
