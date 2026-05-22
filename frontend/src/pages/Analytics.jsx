import { useEffect, useMemo, useState } from 'react';
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
        const [{ data: revData }, { data: topData }, { data: invData }] = await Promise.all([
          api.get('/analytics/revenue'),
          api.get('/analytics/top-products?limit=6'),
          api.get('/analytics/inventory?threshold=5')
        ]);

        setRevenue(revData);
        setTopProducts(topData);
        setInventory(invData);
      } catch (err) {
        setError(err.response?.data?.message || 'Unable to load analytics at the moment.');
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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900">Analytics</h2>
        <p className="text-sm text-slate-500">Revenue, sales momentum, and inventory health in one place.</p>
      </div>

      {loading ? <p className="text-sm font-medium text-slate-500">Loading analytics...</p> : null}
      {error ? <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">{error}</p> : null}

      <div className="grid gap-4 xl:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between gap-2">
            <h3 className="text-sm font-bold text-slate-600">Monthly Revenue</h3>
            <button
              type="button"
              onClick={exportRevenue}
              className="rounded-lg border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Export CSV
            </button>
          </div>
          <RevenueChart dataPoints={revenue.monthlyRevenue} />
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between gap-2">
            <h3 className="text-sm font-bold text-slate-600">Top Product Sales</h3>
            <button
              type="button"
              onClick={exportTopProducts}
              className="rounded-lg border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Export CSV
            </button>
          </div>
          <SalesChart products={topProducts} />
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:max-w-md">
        <div className="mb-3 flex items-center justify-between gap-2">
          <h3 className="text-sm font-bold text-slate-600">Inventory Snapshot</h3>
          <button
            type="button"
            onClick={exportLowStock}
            className="rounded-lg border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
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
