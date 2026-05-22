const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { revenue, topProducts, inventory } = require('../controllers/analyticsController');

const router = express.Router();

router.use(protect);

router.get('/revenue', revenue);
router.get('/top-products', topProducts);
router.get('/inventory', inventory);

module.exports = router;
