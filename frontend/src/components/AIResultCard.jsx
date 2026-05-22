import { Copy, Download } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import toast from 'react-hot-toast';

const AIResultCard = ({ title, content, compact = false }) => {
  const copyContent = async () => {
    try {
      await navigator.clipboard.writeText(content || '');
      toast.success(`${title} copied`);
    } catch (error) {
      toast.error('Failed to copy content');
    }
  };

  const exportContent = () => {
    const blob = new Blob([content || ''], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = `${title.toLowerCase().replace(/\s+/g, '-')}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success(`${title} exported`);
  };

  return (
    <div className="rounded-2xl border border-cyan-100 bg-cyan-50/50 p-4 dark:border-cyan-900/40 dark:bg-cyan-950/20">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-bold uppercase tracking-wide text-cyan-700 dark:text-cyan-300">{title}</h3>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={copyContent}
            className="inline-flex items-center gap-1 rounded-lg border border-cyan-200 bg-white px-2 py-1 text-xs font-semibold text-cyan-700 transition hover:bg-cyan-50 dark:border-cyan-900 dark:bg-slate-900 dark:text-cyan-300"
          >
            <Copy size={12} /> Copy
          </button>
          <button
            type="button"
            onClick={exportContent}
            className="inline-flex items-center gap-1 rounded-lg border border-cyan-200 bg-white px-2 py-1 text-xs font-semibold text-cyan-700 transition hover:bg-cyan-50 dark:border-cyan-900 dark:bg-slate-900 dark:text-cyan-300"
          >
            <Download size={12} /> Export
          </button>
        </div>
      </div>

      <div className={compact ? 'mt-3 max-h-72 overflow-y-auto rounded-xl bg-white/70 p-3 dark:bg-slate-900/70' : 'mt-3 rounded-xl bg-white/70 p-3 dark:bg-slate-900/70'}>
        {compact ? (
          <details>
            <summary className="cursor-pointer text-sm font-semibold text-slate-700 dark:text-slate-200">View suggestions</summary>
            <div className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-200">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{content || 'No output yet.'}</ReactMarkdown>
            </div>
          </details>
        ) : (
          <div className="space-y-2 text-sm text-slate-700 dark:text-slate-200">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content || 'No output yet.'}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIResultCard;
