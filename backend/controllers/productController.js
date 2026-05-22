const { validationResult } = require('express-validator');
const Product = require('../models/Product');

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
    return res.status(200).json(products);
  } catch (error) {
    return next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      category,
      price,
      stock,
      description = '',
      tags = [],
      image = '',
      sales = 0
    } = req.body;

    const product = await Product.create({
      title,
      category,
      price,
      stock,
      description,
      tags,
      image,
      sales,
      createdBy: req.user._id
    });

    return res.status(201).json(product);
  } catch (error) {
    return next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const product = await Product.findOne({
      _id: req.params.id,
      createdBy: req.user._id
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const fields = [
      'title',
      'category',
      'price',
      'stock',
      'description',
      'tags',
      'image',
      'sales'
    ];

    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        product[field] = req.body[field];
      }
    });

    const updatedProduct = await product.save();
    return res.status(200).json(updatedProduct);
  } catch (error) {
    return next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      createdBy: req.user._id
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.deleteOne();

    return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
};
