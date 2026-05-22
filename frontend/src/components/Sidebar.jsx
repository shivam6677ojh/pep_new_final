import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, CirclePlus, ChartColumnIncreasing, Sparkles } from 'lucide-react';

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/products', label: 'Products', icon: Package },
  { to: '/products/add', label: 'Add Product', icon: CirclePlus },
  { to: '/analytics', label: 'Analytics', icon: ChartColumnIncreasing },
  { to: '/ai-content', label: 'AI Content', icon: Sparkles }
];

const Sidebar = () => {
  return (
    <aside className="w-full border-r border-slate-200 bg-white lg:w-64 dark:border-slate-800 dark:bg-slate-950">
      <div className="border-b border-slate-200 px-6 py-5 dark:border-slate-800">
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Navigation</p>
      </div>
      <nav className="space-y-2 p-4">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                isActive
                  ? 'bg-cyan-600 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-cyan-50 hover:text-cyan-700 dark:text-slate-200 dark:hover:bg-slate-900 dark:hover:text-cyan-300'
              }`
            }
          >
              <link.icon size={16} />
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
