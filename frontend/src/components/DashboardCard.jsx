const DashboardCard = ({ title, value, subtitle }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{title}</p>
      <p className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-slate-100">{value}</p>
      {subtitle ? <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p> : null}
    </div>
  );
};

export default DashboardCard;
