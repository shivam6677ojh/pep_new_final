const ProductCard = ({ product, onDelete }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-slate-900">{product.title}</h3>
          <p className="text-sm text-slate-500">{product.category}</p>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          Stock: {product.stock}
        </span>
      </div>
      <p className="mt-3 text-sm text-slate-600">{product.description || 'No description yet.'}</p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
          Price: ${product.price}
        </span>
        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
          Sales: {product.sales}
        </span>
      </div>
      <button
        type="button"
        onClick={() => onDelete(product._id)}
        className="mt-4 rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700"
      >
        Delete
      </button>
    </div>
  );
};

export default ProductCard;
