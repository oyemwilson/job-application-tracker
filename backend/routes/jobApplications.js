const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const JobApplication = require('../models/JobApplication');
const mongoose = require('mongoose');

// Get all job applications for the authenticated user
router.get('/', auth, async (req, res) => {
  try {
    const applications = await JobApplication.find({ user: req.user.id });
    res.json(applications);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Add a new job application
router.post('/', auth, async (req, res) => {
  const { jobTitle, company, status, appliedDate, notes } = req.body;
  try {
    const newApplication = new JobApplication({
      user: req.user.id,
      jobTitle,
      company,
      status,
      appliedDate,
      notes,
    });
    const application = await newApplication.save();
    res.json(application);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Update an existing job application
router.put('/:id', auth, async (req, res) => {
  const { jobTitle, company, status, appliedDate, notes } = req.body;
  try {
    let application = await JobApplication.findById(req.params.id);
    if (!application) return res.status(404).json({ msg: 'Application not found' });

    if (application.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

    application = await JobApplication.findByIdAndUpdate(
      req.params.id,
      { jobTitle, company, status, appliedDate, notes },
      { new: true }
    );
    res.json(application);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    console.log('Received ID:', req.params.id); // Log the received ID

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      console.log('Invalid ID:', req.params.id); // Log invalid IDs
      return res.status(400).json({ msg: 'Invalid application ID' });
    }

    // Find the application
    let application = await JobApplication.findById(req.params.id);
    if (!application) {
      console.log('Application not found for ID:', req.params.id); // Log missing applications
      return res.status(404).json({ msg: 'Application not found' });
    }

    console.log('Application user:', application.user); // Log the application user
    console.log('Request user:', req.user.id); // Log the request user

    // Check if the user is authorized
    if (application.user.toString() !== req.user.id) {
      console.log('Unauthorized access attempt'); // Log unauthorized attempts
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // Delete the application
    await JobApplication.findByIdAndDelete(req.params.id);
    console.log('Application deleted successfully'); // Log successful deletion
    res.json({ msg: 'Application removed' });
  } catch (err) {
    console.error('Error in delete route:', err); // Log the full error
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;