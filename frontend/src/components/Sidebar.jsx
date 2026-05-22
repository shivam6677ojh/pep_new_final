import { NavLink } from 'react-router-dom';

const links = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/products', label: 'Products' },
  { to: '/products/add', label: 'Add Product' },
  { to: '/analytics', label: 'Analytics' },
  { to: '/ai-content', label: 'AI Content' }
];

const Sidebar = () => {
  return (
    <aside className="w-full border-r border-slate-200 bg-white lg:w-64">
      <div className="border-b border-slate-200 px-6 py-5">
        <p className="text-sm font-semibold text-slate-500">Navigation</p>
      </div>
      <nav className="space-y-2 p-4">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `block rounded-xl px-4 py-3 text-sm font-semibold transition ${
                isActive
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-slate-700 hover:bg-cyan-50 hover:text-cyan-700'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
