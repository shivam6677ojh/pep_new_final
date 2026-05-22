const { getGeminiModel } = require('../config/gemini');

const buildResponse = async (prompt) => {
  const model = getGeminiModel();
  const result = await model.generateContent(prompt);
  return result.response?.text()?.trim() || '';
};

const generateDescription = async ({ title, category, features, tone }) => {
  const prompt = `Generate a concise product description for an ecommerce listing.\n\nProduct: ${title}\nCategory: ${category}\nFeatures: ${features || 'N/A'}\nTone: ${tone || 'professional'}\n\nReturn 1 short paragraph and 3 bullet points.`;
  return buildResponse(prompt);
};

const generateTags = async ({ title, category, description }) => {
  const prompt = `Generate 10 SEO-friendly tags for this product. Return only comma-separated tags.\n\nProduct: ${title}\nCategory: ${category}\nDescription: ${description || 'N/A'}`;
  return buildResponse(prompt);
};

const generateCaption = async ({ title, category, audience, platform }) => {
  const prompt = `Write a catchy marketing caption for ${platform || 'social media'}.\n\nProduct: ${title}\nCategory: ${category}\nAudience: ${audience || 'general customers'}\n\nReturn a single caption plus 5 hashtags.`;
  return buildResponse(prompt);
};

const generateSuggestions = async ({ businessSummary, topProducts, currentIssues }) => {
  const prompt = `You are an ecommerce growth assistant. Give 5 practical sales suggestions.\n\nBusiness summary: ${businessSummary || 'N/A'}\nTop products: ${topProducts || 'N/A'}\nCurrent issues: ${currentIssues || 'N/A'}\n\nReturn numbered action items with expected impact.`;
  return buildResponse(prompt);
};

module.exports = {
  generateDescription,
  generateTags,
  generateCaption,
  generateSuggestions
};
