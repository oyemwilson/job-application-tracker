const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const fs = require('fs');
const path = require('path');

// Load mock job data from a JSON file
const jobsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/jobs.json'), 'utf-8'));

// Get job recommendations for the authenticated user
router.get('/recommendations', auth, async (req, res) => {
  try {
    const user = await require('../models/User').findById(req.user.id);
    const userSkills = user.skills.map(skill => skill.toLowerCase());

    const recommendedJobs = jobsData.filter(job =>
      job.skills.some(skill => userSkills.includes(skill.toLowerCase()))
    );

    res.json(recommendedJobs);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;