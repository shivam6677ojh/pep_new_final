const Product = require('../models/Product');

const demoProducts = [
  {
    title: 'Wireless Headphones',
    category: 'Audio',
    price: 299,
    stock: 20,
    description: 'Premium wireless headphones with clear sound and all-day comfort.',
    tags: ['wireless', 'audio', 'bluetooth', 'premium'],
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
    sales: 120
  },
  {
    title: 'Smart Watch Pro',
    category: 'Wearables',
    price: 189,
    stock: 14,
    description: 'Track activity, calls, and health metrics with a vibrant display.',
    tags: ['smartwatch', 'wearable', 'fitness', 'health'],
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
    sales: 86
  },
  {
    title: 'Portable Speaker',
    category: 'Audio',
    price: 129,
    stock: 9,
    description: 'Compact portable speaker with rich bass and quick charging.',
    tags: ['speaker', 'portable', 'music', 'bass'],
    image: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=900&q=80',
    sales: 63
  }
];

const seedDemoProducts = async (userId) => {
  const existingCount = await Product.countDocuments({ createdBy: userId });

  if (existingCount > 0) {
    return;
  }

  await Product.insertMany(
    demoProducts.map((product) => ({
      ...product,
      createdBy: userId
    }))
  );
};

module.exports = seedDemoProducts;
