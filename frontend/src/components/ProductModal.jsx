import { useEffect, useState } from 'react';

const ProductModal = ({ product, mode = 'view', onClose, onSave, saving = false }) => {
  const [formData, setFormData] = useState(product || {});

  useEffect(() => {
    setFormData(product || {});
  }, [product]);

  if (!product) {
    return null;
  }

  const onChange = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const revenueEstimate = Math.round((Number(formData.price || 0) * Number(formData.sales || 0)) || 0);
  const isReadOnly = mode === 'view';

  const submit = (event) => {
    event.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-950">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-600">Product Details</p>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">{formData.title}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">{formData.category}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900"
          >
            Close
          </button>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[280px_1fr]">
          <div className="space-y-4">
            {formData.image ? (
              <img
                src={formData.image}
                alt={formData.title}
                className="h-64 w-full rounded-2xl object-cover"
              />
            ) : (
              <div className="flex h-64 items-center justify-center rounded-2xl bg-linear-to-br from-cyan-100 to-emerald-100 text-3xl font-black text-cyan-700">
                {String(formData.title || 'P')
                  .slice(0, 1)
                  .toUpperCase()}
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-900">
                <p className="text-slate-500 dark:text-slate-400">Price</p>
                <p className="text-lg font-bold text-slate-900 dark:text-slate-100">${formData.price}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-900">
                <p className="text-slate-500 dark:text-slate-400">Stock</p>
                <p className="text-lg font-bold text-slate-900 dark:text-slate-100">{formData.stock}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-900">
                <p className="text-slate-500 dark:text-slate-400">Sales</p>
                <p className="text-lg font-bold text-slate-900 dark:text-slate-100">{formData.sales}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-900">
                <p className="text-slate-500 dark:text-slate-400">Revenue</p>
                <p className="text-lg font-bold text-slate-900 dark:text-slate-100">${revenueEstimate}</p>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <section className="rounded-2xl border border-cyan-100 bg-cyan-50/60 p-4 dark:border-cyan-900/40 dark:bg-cyan-950/30">
              <h4 className="text-sm font-bold uppercase tracking-wide text-cyan-700 dark:text-cyan-300">AI-ready overview</h4>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">{formData.description || 'No description provided yet.'}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {(formData.tags || []).map((tag) => (
                  <span key={tag} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-cyan-700 shadow-sm dark:bg-slate-900 dark:text-cyan-300">
                    {tag}
                  </span>
                ))}
              </div>
            </section>

            <form onSubmit={submit} className="grid gap-4 md:grid-cols-2">
              <input
                name="title"
                value={formData.title || ''}
                onChange={onChange}
                disabled={isReadOnly}
                className="rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-cyan-500 focus:outline-none disabled:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                placeholder="Title"
              />
              <input
                name="category"
                value={formData.category || ''}
                onChange={onChange}
                disabled={isReadOnly}
                className="rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-cyan-500 focus:outline-none disabled:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                placeholder="Category"
              />
              <input
                name="price"
                type="number"
                value={formData.price || ''}
                onChange={onChange}
                disabled={isReadOnly}
                className="rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-cyan-500 focus:outline-none disabled:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                placeholder="Price"
              />
              <input
                name="stock"
                type="number"
                value={formData.stock || ''}
                onChange={onChange}
                disabled={isReadOnly}
                className="rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-cyan-500 focus:outline-none disabled:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                placeholder="Stock"
              />
              <input
                name="image"
                value={formData.image || ''}
                onChange={onChange}
                disabled={isReadOnly}
                className="rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-cyan-500 focus:outline-none md:col-span-2 disabled:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                placeholder="Image URL"
              />
              <textarea
                name="description"
                rows="4"
                value={formData.description || ''}
                onChange={onChange}
                disabled={isReadOnly}
                className="rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-cyan-500 focus:outline-none md:col-span-2 disabled:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                placeholder="Description"
              />

              {!isReadOnly ? (
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-cyan-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:bg-cyan-300 md:col-span-2"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
