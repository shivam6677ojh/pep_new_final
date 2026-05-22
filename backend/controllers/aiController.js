const { validationResult } = require('express-validator');
const {
  generateDescription,
  generateTags,
  generateCaption,
  generateSuggestions,
  generatePricingSuggestion,
  generateProductScore
} = require('../services/aiService');

const handleValidation = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return false;
  }
  return true;
};

const description = async (req, res, next) => {
  try {
    if (!handleValidation(req, res)) return;
    const result = await generateDescription(req.body);
    return res.status(200).json({ result });
  } catch (error) {
    return next(error);
  }
};

const tags = async (req, res, next) => {
  try {
    if (!handleValidation(req, res)) return;
    const result = await generateTags(req.body);
    return res.status(200).json({ result });
  } catch (error) {
    return next(error);
  }
};

const caption = async (req, res, next) => {
  try {
    if (!handleValidation(req, res)) return;
    const result = await generateCaption(req.body);
    return res.status(200).json({ result });
  } catch (error) {
    return next(error);
  }
};

const suggestions = async (req, res, next) => {
  try {
    if (!handleValidation(req, res)) return;
    const result = await generateSuggestions(req.body);
    return res.status(200).json({ result });
  } catch (error) {
    return next(error);
  }
};

const pricing = async (req, res, next) => {
  try {
    if (!handleValidation(req, res)) return;
    const result = await generatePricingSuggestion(req.body);
    return res.status(200).json({ result });
  } catch (error) {
    return next(error);
  }
};

const score = async (req, res, next) => {
  try {
    if (!handleValidation(req, res)) return;
    const result = await generateProductScore(req.body);
    return res.status(200).json({ result });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  description,
  tags,
  caption,
  suggestions,
  pricing,
  score
};
