require('dotenv').config();
const express = require('express');
const mongoose = require('./config/database');
const categoryRoutes = require('./routes/Kategori');
const productRoutes = require('./routes/Produk');

const app = express();
app.use(express.json());

// Use routes
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
