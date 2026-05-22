import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');

  const onChange = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      await login(formData, rememberMe);
      toast.success('Welcome back');
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      toast.error('Login failed');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-cyan-100 via-white to-emerald-100 px-4 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <form onSubmit={onSubmit} className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-800 dark:bg-slate-950">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-600">SmartStore AI</p>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-slate-100">Welcome Back</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Sign in to continue managing your store.</p>

        <div className="mt-6 space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={onChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-cyan-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={onChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-cyan-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          />
        </div>

        <label className="mt-4 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(event) => setRememberMe(event.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-cyan-600"
          />
          Remember me
        </label>

        {error ? <p className="mt-3 text-sm font-semibold text-rose-600">{error}</p> : null}

        <button className="mt-6 w-full rounded-xl bg-cyan-600 py-3 text-sm font-bold text-white transition hover:bg-cyan-700">
          Login
        </button>

        <p className="mt-4 text-center text-sm text-slate-600 dark:text-slate-400">
          New here?{' '}
          <Link to="/register" className="font-semibold text-cyan-700">
            Create account
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
