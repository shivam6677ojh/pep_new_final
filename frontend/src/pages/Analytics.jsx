import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import jsPDF from 'jspdf';
import api from '../api/axios';
import RevenueChart from '../charts/RevenueChart';
import SalesChart from '../charts/SalesChart';
import InventoryChart from '../charts/InventoryChart';
import { exportToCsv } from '../utils/exportCsv';

const Analytics = () => {
  const [revenue, setRevenue] = useState({ monthlyRevenue: [] });
  const [topProducts, setTopProducts] = useState([]);
  const [inventory, setInventory] = useState({ lowStockCount: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');

      try {
        const revenueResponse = await api.get('/analytics/revenue');
        const topProductsResponse = await api.get('/analytics/top-products?limit=6');
        const inventoryResponse = await api.get('/analytics/inventory?threshold=5');

        setRevenue(revenueResponse.data);
        setTopProducts(topProductsResponse.data);
        setInventory(inventoryResponse.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Unable to load analytics at the moment.');
        toast.error('Failed to fetch analytics');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const healthyStockCount = useMemo(() => {
    return Math.max(topProducts.length - inventory.lowStockCount, 0);
  }, [topProducts, inventory.lowStockCount]);

  const exportRevenue = () => {
    exportToCsv(revenue.monthlyRevenue, 'monthly-revenue.csv');
  };

  const exportTopProducts = () => {
    const rows = topProducts.map((item) => ({
      title: item.title,
      category: item.category,
      sales: item.sales,
      price: item.price,
      stock: item.stock
    }));

    exportToCsv(rows, 'top-products.csv');
  };

  const exportLowStock = () => {
    const rows = (inventory.lowStockProducts || []).map((item) => ({
      title: item.title,
      category: item.category,
      stock: item.stock,
      sales: item.sales
    }));

    exportToCsv(rows, 'low-stock-products.csv');
  };

  const exportPdf = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('SmartStore AI Analytics Report', 14, 18);
    doc.setFontSize(11);
    doc.text(`Total Revenue: $${revenue.totalRevenue || 0}`, 14, 32);
    doc.text(`Units Sold: ${revenue.totalUnitsSold || 0}`, 14, 40);
    doc.text(`Product Count: ${revenue.productCount || 0}`, 14, 48);

    doc.text('Top Products:', 14, 62);
    topProducts.slice(0, 5).forEach((product, index) => {
      doc.text(
        `${index + 1}. ${product.title} | Sales: ${product.sales} | Price: $${product.price}`,
        16,
        72 + index * 8
      );
    });

    doc.save('smartstore-analytics-report.pdf');
    toast.success('PDF report downloaded');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">Analytics</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">Revenue, sales momentum, and inventory health in one place.</p>
      </div>

      {loading ? <p className="text-sm font-medium text-slate-500">Loading analytics...</p> : null}
      {error ? <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">{error}</p> : null}

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={exportPdf}
          className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900"
        >
          Export PDF
        </button>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <div className="mb-3 flex items-center justify-between gap-2">
            <h3 className="text-sm font-bold text-slate-600 dark:text-slate-300">Monthly Revenue</h3>
            <button
              type="button"
              onClick={exportRevenue}
              className="rounded-lg border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900"
            >
              Export CSV
            </button>
          </div>
          <RevenueChart dataPoints={revenue.monthlyRevenue} />
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <div className="mb-3 flex items-center justify-between gap-2">
            <h3 className="text-sm font-bold text-slate-600 dark:text-slate-300">Top Product Sales</h3>
            <button
              type="button"
              onClick={exportTopProducts}
              className="rounded-lg border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900"
            >
              Export CSV
            </button>
          </div>
          <SalesChart products={topProducts} />
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:max-w-md dark:border-slate-800 dark:bg-slate-950">
        <div className="mb-3 flex items-center justify-between gap-2">
          <h3 className="text-sm font-bold text-slate-600 dark:text-slate-300">Inventory Snapshot</h3>
          <button
            type="button"
            onClick={exportLowStock}
            className="rounded-lg border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900"
          >
            Export CSV
          </button>
        </div>
        <InventoryChart lowStockCount={inventory.lowStockCount} healthyStockCount={healthyStockCount} />
      </div>
    </div>
  );
};

export default Analytics;
