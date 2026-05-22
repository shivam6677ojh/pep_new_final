import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-sky-50 via-white to-emerald-50">
      <Navbar />
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:px-8">
        <Sidebar />
        <main className="flex-1 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
