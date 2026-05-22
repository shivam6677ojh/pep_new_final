const AIResultCard = ({ title, content }) => {
  return (
    <div className="rounded-2xl border border-cyan-100 bg-cyan-50/50 p-4">
      <h3 className="text-sm font-bold uppercase tracking-wide text-cyan-700">{title}</h3>
      <pre className="mt-2 whitespace-pre-wrap font-sans text-sm text-slate-700">{content || 'No output yet.'}</pre>
    </div>
  );
};

export default AIResultCard;
