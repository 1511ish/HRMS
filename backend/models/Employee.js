
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  phone: {
    type: String,
    required: true,
  },

  position: {
    type: String,
    required: true,
  },

  joiningDate: {
    type: Date,
    required: true,
  },

  experience: {
    type: String,
    required: true,
  },

  department:{
    type: String,
    required: true
  }

}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);
