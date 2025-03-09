const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Mock suggestions for resume feedback
const suggestions = [
  'Tailor your resume to the job description.',
  'Quantify your achievements with numbers.',
  'Use action verbs to describe your experience.',
  'Include relevant keywords from the job posting.',
  'Keep your resume concise and focused.',
];

// Get resume feedback
router.post('/feedback', auth, (req, res) => {
  const { resumeText } = req.body;
  if (!resumeText) return res.status(400).json({ msg: 'Resume text is required' });

  // Simulate AI processing by returning 3 random suggestions
  const randomSuggestions = suggestions.sort(() => 0.5 - Math.random()).slice(0, 3);
  res.json({ suggestions: randomSuggestions });
});

module.exports = router;