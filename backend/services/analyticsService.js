const Product = require('../models/Product');

const getRevenueMetrics = async (userId) => {
  const revenueAgg = await Product.aggregate([
    { $match: { createdBy: userId } },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: { $multiply: ['$price', '$sales'] } },
        totalUnitsSold: { $sum: '$sales' },
        productCount: { $sum: 1 }
      }
    }
  ]);

  const monthlyAgg = await Product.aggregate([
    { $match: { createdBy: userId } },
    {
      $project: {
        month: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
        revenue: { $multiply: ['$price', '$sales'] }
      }
    },
    {
      $group: {
        _id: '$month',
        revenue: { $sum: '$revenue' }
      }
    },
    { $sort: { _id: 1 } }
  ]);

  return {
    totalRevenue: revenueAgg[0]?.totalRevenue || 0,
    totalUnitsSold: revenueAgg[0]?.totalUnitsSold || 0,
    productCount: revenueAgg[0]?.productCount || 0,
    monthlyRevenue: monthlyAgg.map((item) => ({
      month: item._id,
      revenue: item.revenue
    }))
  };
};

const getTopProducts = async (userId, limit = 5) => {
  const safeLimit = Number.isFinite(limit) ? limit : 5;

  return Product.find({ createdBy: userId })
    .sort({ sales: -1 })
    .limit(Math.max(1, Math.min(safeLimit, 20)))
    .select('title category price stock sales image');
};

const getInventoryInsights = async (userId, threshold = 5) => {
  const safeThreshold = Number.isFinite(threshold) ? threshold : 5;

  const lowStockProducts = await Product.find({
    createdBy: userId,
    stock: { $lte: Math.max(0, safeThreshold) }
  })
    .sort({ stock: 1 })
    .select('title category stock sales');

  const distributionAgg = await Product.aggregate([
    { $match: { createdBy: userId } },
    {
      $group: {
        _id: '$category',
        count: { $sum: 1 }
      }
    },
    { $sort: { count: -1 } }
  ]);

  return {
    threshold: Math.max(0, safeThreshold),
    lowStockCount: lowStockProducts.length,
    lowStockProducts,
    categoryDistribution: distributionAgg.map((item) => ({
      category: item._id,
      count: item.count
    }))
  };
};

module.exports = {
  getRevenueMetrics,
  getTopProducts,
  getInventoryInsights
};
