import { useState } from 'react';
import toast from 'react-hot-toast';
import api from '../api/axios';
import AIResultCard from '../components/AIResultCard';

const AIContent = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    audience: '',
    platform: 'Instagram'
  });
  const [results, setResults] = useState({
    description: '',
    tags: '',
    caption: '',
    pricing: '',
    score: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const delay = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));

  const onChange = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const generateAll = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const descRes = await api.post('/ai/description', formData);
      await delay(4000);
      const tagsRes = await api.post('/ai/tags', formData);
      await delay(4000);
      const capRes = await api.post('/ai/caption', formData);
      await delay(4000);
      const pricingRes = await api.post('/ai/pricing', formData);
      await delay(4000);
      const scoreRes = await api.post('/ai/score', formData);

      setResults({
        description: descRes.data.result,
        tags: tagsRes.data.result,
        caption: capRes.data.result,
        pricing: pricingRes.data.result,
        score: scoreRes.data.result
      });
      toast.success('AI content generated');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to generate content right now.');
      toast.error('Failed to generate AI content');
    } finally {
      setLoading(false);
    }
  };

  const clearResults = () => {
    setResults({
      description: '',
      tags: '',
      caption: '',
      pricing: '',
      score: ''
    });
    setError('');
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">AI Content Studio</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">Generate descriptions, tags, captions, pricing ideas, and product scores in one click.</p>
      </div>

      <form onSubmit={generateAll} className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:grid-cols-2 dark:border-slate-800 dark:bg-slate-950">
        <input
          name="title"
          value={formData.title}
          onChange={onChange}
          placeholder="Product Title"
          className="rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-cyan-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          required
        />
        <input
          name="category"
          value={formData.category}
          onChange={onChange}
          placeholder="Category"
          className="rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-cyan-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          required
        />
        <input
          name="audience"
          value={formData.audience}
          onChange={onChange}
          placeholder="Audience"
          className="rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-cyan-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
        />
        <input
          name="platform"
          value={formData.platform}
          onChange={onChange}
          placeholder="Platform"
          className="rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-cyan-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
        />
        <textarea
          name="description"
          rows="3"
          value={formData.description}
          onChange={onChange}
          placeholder="Optional base description"
          className="rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-cyan-500 focus:outline-none md:col-span-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
        />
        <div className="flex flex-wrap gap-2 md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-cyan-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:bg-cyan-300"
          >
            {loading ? 'Generating AI Content...' : 'Generate AI Content'}
          </button>
          <button
            type="button"
            onClick={clearResults}
            className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
          >
            Clear Output
          </button>
        </div>
      </form>

      {error ? <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">{error}</p> : null}

      {loading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
          Generating AI Content... Please wait.
        </div>
      ) : null}

      <div className="grid gap-4 xl:grid-cols-2">
        <AIResultCard title="Description" content={results.description} />
        <AIResultCard title="SEO Tags" content={results.tags} />
        <AIResultCard title="Caption" content={results.caption} />
        <AIResultCard title="AI Pricing Suggestion" content={results.pricing} />
        <AIResultCard title="AI Product Score" content={results.score} />
      </div>
    </div>
  );
};

export default AIContent;
