import { useState } from 'react';
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
    caption: ''
  });

  const onChange = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const generateAll = async (event) => {
    event.preventDefault();

    const [descRes, tagsRes, capRes] = await Promise.all([
      api.post('/ai/description', formData),
      api.post('/ai/tags', formData),
      api.post('/ai/caption', formData)
    ]);

    setResults({
      description: descRes.data.result,
      tags: tagsRes.data.result,
      caption: capRes.data.result
    });
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900">AI Content Studio</h2>
        <p className="text-sm text-slate-500">Generate descriptions, tags, and captions in one click.</p>
      </div>

      <form onSubmit={generateAll} className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:grid-cols-2">
        <input
          name="title"
          value={formData.title}
          onChange={onChange}
          placeholder="Product Title"
          className="rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-cyan-500 focus:outline-none"
          required
        />
        <input
          name="category"
          value={formData.category}
          onChange={onChange}
          placeholder="Category"
          className="rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-cyan-500 focus:outline-none"
          required
        />
        <input
          name="audience"
          value={formData.audience}
          onChange={onChange}
          placeholder="Audience"
          className="rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-cyan-500 focus:outline-none"
        />
        <input
          name="platform"
          value={formData.platform}
          onChange={onChange}
          placeholder="Platform"
          className="rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-cyan-500 focus:outline-none"
        />
        <textarea
          name="description"
          rows="3"
          value={formData.description}
          onChange={onChange}
          placeholder="Optional base description"
          className="rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-cyan-500 focus:outline-none md:col-span-2"
        />
        <button className="rounded-xl bg-cyan-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-cyan-700 md:col-span-2">
          Generate AI Content
        </button>
      </form>

      <div className="grid gap-4 lg:grid-cols-3">
        <AIResultCard title="Description" content={results.description} />
        <AIResultCard title="SEO Tags" content={results.tags} />
        <AIResultCard title="Caption" content={results.caption} />
      </div>
    </div>
  );
};

export default AIContent;
