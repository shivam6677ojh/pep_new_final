import { useEffect, useMemo, useState } from 'react';
import api from '../api/axios';
import RevenueChart from '../charts/RevenueChart';
import SalesChart from '../charts/SalesChart';
import InventoryChart from '../charts/InventoryChart';

const Analytics = () => {
  const [revenue, setRevenue] = useState({ monthlyRevenue: [] });
  const [topProducts, setTopProducts] = useState([]);
  const [inventory, setInventory] = useState({ lowStockCount: 0 });

  useEffect(() => {
    const load = async () => {
      const [{ data: revData }, { data: topData }, { data: invData }] = await Promise.all([
        api.get('/analytics/revenue'),
        api.get('/analytics/top-products?limit=6'),
        api.get('/analytics/inventory?threshold=5')
      ]);

      setRevenue(revData);
      setTopProducts(topData);
      setInventory(invData);
    };

    load();
  }, []);

  const healthyStockCount = useMemo(() => {
    return Math.max(topProducts.length - inventory.lowStockCount, 0);
  }, [topProducts, inventory.lowStockCount]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900">Analytics</h2>
        <p className="text-sm text-slate-500">Revenue, sales momentum, and inventory health in one place.</p>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="mb-3 text-sm font-bold text-slate-600">Monthly Revenue</h3>
          <RevenueChart dataPoints={revenue.monthlyRevenue} />
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="mb-3 text-sm font-bold text-slate-600">Top Product Sales</h3>
          <SalesChart products={topProducts} />
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:max-w-md">
        <h3 className="mb-3 text-sm font-bold text-slate-600">Inventory Snapshot</h3>
        <InventoryChart lowStockCount={inventory.lowStockCount} healthyStockCount={healthyStockCount} />
      </div>
    </div>
  );
};

export default Analytics;
