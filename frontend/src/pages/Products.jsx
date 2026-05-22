import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalMode, setModalMode] = useState('view');
  const [saving, setSaving] = useState(false);

  const fetchProducts = async () => {
    try {
      const { data } = await api.get('/products');
      setProducts(data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load products');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      toast.success('Product deleted successfully');
      await fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete product');
    }
  };

  const categories = useMemo(() => {
    return ['all', ...new Set(products.map((product) => product.category))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.toLowerCase().trim();

    return [...products]
      .filter((product) => {
        const matchesSearch =
          !normalizedSearch ||
          [product.title, product.category, product.description, ...(product.tags || [])]
            .join(' ')
            .toLowerCase()
            .includes(normalizedSearch);

        const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;

        return matchesSearch && matchesCategory;
      })
      .sort((left, right) => {
        if (sortBy === 'price-asc') return left.price - right.price;
        if (sortBy === 'price-desc') return right.price - left.price;
        if (sortBy === 'stock-asc') return left.stock - right.stock;
        if (sortBy === 'stock-desc') return right.stock - left.stock;
        return new Date(right.createdAt) - new Date(left.createdAt);
      });
  }, [products, searchTerm, categoryFilter, sortBy]);

  const openModal = (product, mode = 'view') => {
    setSelectedProduct(product);
    setModalMode(mode);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setModalMode('view');
  };

  const saveProduct = async (updatedProduct) => {
    try {
      setSaving(true);
      await api.put(`/products/${updatedProduct._id}`, {
        title: updatedProduct.title,
        category: updatedProduct.category,
        price: Number(updatedProduct.price),
        stock: Number(updatedProduct.stock),
        description: updatedProduct.description,
        image: updatedProduct.image,
        tags: updatedProduct.tags,
        sales: Number(updatedProduct.sales)
      });
      toast.success('Product updated successfully');
      closeModal();
      await fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update product');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">Products</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Manage your product listings with real-time control.</p>
        </div>
        <div className="grid gap-3 md:grid-cols-3 lg:w-[58rem]">
          <input
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search products"
            className="rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-cyan-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          />
          <select
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
            className="rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-cyan-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === 'all' ? 'All categories' : category}
              </option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-cyan-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          >
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="stock-asc">Stock: Low to High</option>
            <option value="stock-desc">Stock: High to Low</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onDelete={deleteProduct}
            onView={(selected) => openModal(selected, 'view')}
            onEdit={(selected) => openModal(selected, 'edit')}
          />
        ))}
      </div>

      {!filteredProducts.length ? (
        <p className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
          No products match your current filters. Start by adding your first product.
        </p>
      ) : null}

      {selectedProduct ? (
        <ProductModal
          product={selectedProduct}
          mode={modalMode}
          onClose={closeModal}
          onSave={saveProduct}
          saving={saving}
        />
      ) : null}
    </div>
  );
};

export default Products;
