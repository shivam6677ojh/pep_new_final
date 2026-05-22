import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600">SmartStore AI</p>
          <h1 className="text-lg font-bold text-slate-900">Growth Dashboard</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden rounded-full bg-cyan-50 px-3 py-1 text-sm font-medium text-cyan-700 sm:block">
            {user?.name || 'Store Owner'}
          </div>
          <button
            type="button"
            onClick={logout}
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
