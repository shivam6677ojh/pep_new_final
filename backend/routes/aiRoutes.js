const express = require('express');
const { body } = require('express-validator');
const { protect } = require('../middleware/authMiddleware');
const { description, tags, caption, suggestions, pricing, score } = require('../controllers/aiController');

const router = express.Router();

router.use(protect);

router.post(
  '/description',
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('category').trim().notEmpty().withMessage('Category is required')
  ],
  description
);

router.post(
  '/tags',
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('category').trim().notEmpty().withMessage('Category is required')
  ],
  tags
);

router.post(
  '/caption',
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('category').trim().notEmpty().withMessage('Category is required')
  ],
  caption
);

router.post('/suggestions', [body('businessSummary').optional().isString()], suggestions);

router.post(
  '/pricing',
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('category').trim().notEmpty().withMessage('Category is required'),
    body('price').optional().isFloat({ min: 0 })
  ],
  pricing
);

router.post(
  '/score',
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('category').trim().notEmpty().withMessage('Category is required')
  ],
  score
);

module.exports = router;
