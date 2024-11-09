const Category = require('../models/kategori');

// Create Category
exports.createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Categories
exports.getCategories = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};

// Get Single Category
exports.getCategory = async (req, res) => {
  const category = await Category.findById(req.params.id);
  res.json(category);
};

// Update Category
exports.updateCategory = async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(category);
};

// Delete Category
exports.deleteCategory = async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ message: 'Category deleted' });
};
