const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware untuk log setiap permintaan
app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();
});

// Middleware untuk serve file statis dari direktori "public"
app.use(express.static(path.join(__dirname, 'public')));

// Middleware untuk parsing JSON
app.use(express.json());

// Data kategori dan produk sebagai contoh
let categories = [
  { id: 1, name: 'Elektronik' },
  { id: 2, name: 'Perabotan' }
];

let products = [
  { id: 1, name: 'Laptop', category: 'Elektronik' },
  { id: 2, name: 'Meja', category: 'Perabotan' }
];

// Route GET semua kategori produk
app.get('/api/categories', (req, res) => {
  res.json({
    message: "Success fetch categories",
    data: categories
  });
});

// Route GET detail kategori berdasarkan ID
app.get('/api/categories/:id', (req, res) => {
  const categoryId = parseInt(req.params.id);
  const category = categories.find(c => c.id === categoryId);

  if (category) {
    res.json({
      message: "Success fetch category",
      data: category
    });
  } else {
    res.status(404).json({ message: 'Category not found' });
  }
});

// Route POST tambah kategori baru
app.post('/api/categories', (req, res) => {
  const newCategory = { id: categories.length ? categories[categories.length - 1].id + 1 : 1, ...req.body };
  categories.push(newCategory);

  res.status(201).json({
    message: "Category added successfully",
    data: newCategory
  });
});

// Route PUT update kategori berdasarkan ID
app.put('/api/categories/:id', (req, res) => {
  const categoryId = parseInt(req.params.id);
  const categoryIndex = categories.findIndex(c => c.id === categoryId);

  if (categoryIndex !== -1) {
    categories[categoryIndex] = { id: categoryId, ...req.body };
    res.json({
      message: "Category updated successfully",
      data: categories[categoryIndex]
    });
  } else {
    res.status(404).json({ message: 'Category not found' });
  }
});

// Route DELETE kategori berdasarkan ID
app.delete('/api/categories/:id', (req, res) => {
  const categoryId = parseInt(req.params.id);
  const initialLength = categories.length;
  categories = categories.filter(c => c.id !== categoryId);

  if (categories.length < initialLength) {
    res.json({ message: "Category deleted successfully" });
  } else {
    res.status(404).json({ message: 'Category not found' });
  }
});

// Route GET mencari produk berdasarkan nama (query string)
app.get('/api/products/search', (req, res) => {
  const searchQuery = req.query.q;
  const results = products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  res.json({
    message: "Search results",
    data: results
  });
});

// Route GET produk dalam kategori tertentu dan cari berdasarkan nama
app.get('/api/categories/:id/products', (req, res) => {
  const categoryId = parseInt(req.params.id);
  const searchQuery = req.query.q;

  const category = categories.find(c => c.id === categoryId);

  if (category) {
    let filteredProducts = products.filter(p => p.category === category.name);

    if (searchQuery) {
      filteredProducts = filteredProducts.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    res.json({
      message: "Filtered products",
      data: filteredProducts
    });
  } else {
    res.status(404).json({ message: 'Category not found' });
  }
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
