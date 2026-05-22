const {
  getRevenueMetrics,
  getTopProducts,
  getInventoryInsights
} = require('../services/analyticsService');

const revenue = async (req, res, next) => {
  try {
    const data = await getRevenueMetrics(req.user._id);
    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
};

const topProducts = async (req, res, next) => {
  try {
    const limit = Number.parseInt(req.query.limit, 10);
    const data = await getTopProducts(req.user._id, Number.isNaN(limit) ? 5 : limit);
    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
};

const inventory = async (req, res, next) => {
  try {
    const threshold = Number.parseInt(req.query.threshold, 10);
    const data = await getInventoryInsights(req.user._id, Number.isNaN(threshold) ? 5 : threshold);
    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  revenue,
  topProducts,
  inventory
};
