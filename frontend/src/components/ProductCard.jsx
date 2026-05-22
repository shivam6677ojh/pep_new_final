const fallbackImage =
  'data:image/svg+xml;charset=UTF-8,' +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#cffafe" />
          <stop offset="100%" stop-color="#ecfeff" />
        </linearGradient>
      </defs>
      <rect width="800" height="600" rx="40" fill="url(#g)" />
      <circle cx="400" cy="240" r="86" fill="#0f766e" fill-opacity="0.12" />
      <text x="50%" y="57%" text-anchor="middle" font-family="Inter, sans-serif" font-size="48" font-weight="700" fill="#0f172a">Product</text>
    </svg>
  `);

const ProductCard = ({ product, onDelete, onEdit, onView }) => {
  const imageSrc = product.image || fallbackImage;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <button type="button" className="block w-full text-left" onClick={() => onView(product)}>
        <img src={imageSrc} alt={product.title} className="h-44 w-full object-cover" />
      </button>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{product.title}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">{product.category}</p>
          </div>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
            Stock: {product.stock}
          </span>
        </div>
        <p className="mt-3 max-h-16 overflow-hidden text-sm text-slate-600 dark:text-slate-300">{product.description || 'No description yet.'}</p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 dark:bg-sky-950 dark:text-sky-300">
            Price: ${product.price}
          </span>
          <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-950 dark:text-amber-300">
            Sales: {product.sales}
          </span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onView(product)}
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            View
          </button>
          <button
            type="button"
            onClick={() => onEdit(product)}
            className="rounded-xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => onDelete(product._id)}
            className="rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
