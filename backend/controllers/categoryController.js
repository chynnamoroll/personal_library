const categoryService = require('../services/categoryService');

class CategoryController {
  async list(req, res) {
    try {
      const categories = await categoryService.getAllCategories();
      return res.status(200).json(categories);
    } catch (error) {
      return res.status(500).json({ message: 'Something went wrong while fetching categories' });
    }
  }
}

module.exports = new CategoryController();
