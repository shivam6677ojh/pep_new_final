const express = require('express');
const { body, param } = require('express-validator');
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.get('/', getProducts);

router.post(
  '/',
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('category').trim().notEmpty().withMessage('Category is required'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
    body('description').optional().isString(),
    body('tags').optional().isArray(),
    body('image').optional().isString(),
    body('sales').optional().isInt({ min: 0 }).withMessage('Sales must be non-negative')
  ],
  createProduct
);

router.put(
  '/:id',
  [
    param('id').isMongoId().withMessage('Invalid product id'),
    body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
    body('category').optional().trim().notEmpty().withMessage('Category cannot be empty'),
    body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('stock').optional().isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
    body('description').optional().isString(),
    body('tags').optional().isArray(),
    body('image').optional().isString(),
    body('sales').optional().isInt({ min: 0 }).withMessage('Sales must be non-negative')
  ],
  updateProduct
);

router.delete('/:id', [param('id').isMongoId().withMessage('Invalid product id')], deleteProduct);

module.exports = router;
