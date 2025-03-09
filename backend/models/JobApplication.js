const mongoose = require('mongoose');

const JobApplicationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  jobTitle: { type: String, required: true },
  company: { type: String, required: true },
  status: { type: String, enum: ['Applied', 'Interview Scheduled', 'Offer Received', 'Rejected'], default: 'Applied' },
  appliedDate: { type: Date, default: Date.now },
  notes: { type: String },
});

module.exports = mongoose.model('JobApplication', JobApplicationSchema);