const Product = require('../models/Produk');

// Create Product
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Products
exports.getProducts = async (req, res) => {
  const products = await Product.find().populate('category');
  res.json(products);
};

// Get Single Product
exports.getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id).populate('category');
  res.json(product);
};

// Update Product
exports.updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(product);
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Product deleted' });
};
