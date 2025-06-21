
const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // assuming email should be unique
  },
  phone: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  resumeUrl: {
    type: String,
    required: true, // we are storing resume URL, not file
  },
  status: {
    type: String,
    enum: ['New', 'Selected', 'Rejected', 'Scheduled', 'Ongoing'],
    default: 'New',
  }
}, { timestamps: true });

module.exports = mongoose.model('Candidate', candidateSchema);
