import { useEffect, useState } from 'react';
import api from '../api/axios';
import DashboardCard from '../components/DashboardCard';
import AIResultCard from '../components/AIResultCard';

const Dashboard = () => {
  const [metrics, setMetrics] = useState({ totalRevenue: 0, totalUnitsSold: 0, productCount: 0 });
  const [suggestion, setSuggestion] = useState('Loading suggestions...');

  useEffect(() => {
    const load = async () => {
      try {
        const [{ data: revenue }, { data: ai }] = await Promise.all([
          api.get('/analytics/revenue'),
          api.post('/ai/suggestions', {
            businessSummary: 'Small ecommerce store with mixed inventory',
            currentIssues: 'Need better conversion and repeat customers'
          })
        ]);

        setMetrics(revenue);
        setSuggestion(ai.result);
      } catch (error) {
        setSuggestion('Unable to load AI suggestions right now.');
      }
    };

    load();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900">Dashboard Overview</h2>
        <p className="text-sm text-slate-500">Track performance and catch growth opportunities instantly.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <DashboardCard title="Total Revenue" value={`$${metrics.totalRevenue || 0}`} subtitle="All-time sales value" />
        <DashboardCard title="Units Sold" value={metrics.totalUnitsSold || 0} subtitle="Products sold so far" />
        <DashboardCard title="Products" value={metrics.productCount || 0} subtitle="Active catalog count" />
      </div>

      <AIResultCard title="AI Business Suggestions" content={suggestion} />
    </div>
  );
};

export default Dashboard;
