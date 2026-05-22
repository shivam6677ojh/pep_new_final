import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api/axios';

const AddProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    price: '',
    stock: '',
    sales: '',
    description: '',
    image: ''
  });

  const onChange = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await api.post('/products', {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        sales: Number(formData.sales || 0)
      });

      toast.success('Product added successfully');
      navigate('/products');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">Add Product</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">Grow inventory with clean catalog entries.</p>
      </div>

      <form onSubmit={onSubmit} className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 md:grid-cols-2 dark:border-slate-800 dark:bg-slate-950">
        <input
          name="title"
          value={formData.title}
          onChange={onChange}
          placeholder="Title"
          className="rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-cyan-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          required
        />
        <input
          name="category"
          value={formData.category}
          onChange={onChange}
          placeholder="Category"
          className="rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-cyan-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          required
        />
        <input
          name="price"
          type="number"
          value={formData.price}
          onChange={onChange}
          placeholder="Price"
          className="rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-cyan-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          required
        />
        <input
          name="stock"
          type="number"
          value={formData.stock}
          onChange={onChange}
          placeholder="Stock"
          className="rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-cyan-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          required
        />
        <input
          name="sales"
          type="number"
          value={formData.sales}
          onChange={onChange}
          placeholder="Sales"
          className="rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-cyan-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
        />
        <input
          name="image"
          value={formData.image}
          onChange={onChange}
          placeholder="Image URL"
          className="rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-cyan-500 focus:outline-none md:col-span-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={onChange}
          placeholder="Description"
          rows="4"
          className="rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-cyan-500 focus:outline-none md:col-span-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
        />

        <button
          disabled={loading}
          className="rounded-xl bg-cyan-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:bg-cyan-300 md:col-span-2"
        >
          {loading ? 'Saving...' : 'Save Product'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
