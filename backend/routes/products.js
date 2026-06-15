const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET /api/products - Fetch all products with optional filtering
router.get('/', async (req, res) => {
  try {
    const { category, search, minPrice, maxPrice } = req.query;

    let query = {};

    if (category && category !== 'all') {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    const products = await Product.find(query).sort({ createdAt: -1 });

    // Transform to match frontend interface
    const transformedProducts = products.map(p => ({
      id: p._id.toString(),
      name: p.name,
      description: p.description,
      price: p.price,
      image_url: p.imageUrl,
      category: p.category,
      flavors: p.flavors,
      sizes: p.sizes,
      is_featured: p.isFeatured,
      created_at: p.createdAt.toISOString()
    }));

    res.json(transformedProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/products/:id - Fetch single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Transform to match frontend interface
    const transformedProduct = {
      id: product._id.toString(),
      name: product.name,
      description: product.description,
      price: product.price,
      image_url: product.imageUrl,
      category: product.category,
      flavors: product.flavors,
      sizes: product.sizes,
      is_featured: product.isFeatured,
      created_at: product.createdAt.toISOString()
    };

    res.json(transformedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/products - Create new product (admin)
router.post('/', async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      imageUrl: req.body.image_url,
      category: req.body.category,
      flavors: req.body.flavors,
      sizes: req.body.sizes,
      isFeatured: req.body.is_featured || false
    });

    await product.save();

    res.status(201).json({
      id: product._id.toString(),
      ...req.body,
      created_at: product.createdAt.toISOString()
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
