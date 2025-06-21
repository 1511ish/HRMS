// models/Attendance.js
const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    date: Date,
    status: { type: String, enum: ['Present', 'Absent', 'Leave'], default: 'Present' },
}, { timestamps: true });

module.exports = mongoose.model('Attendance', AttendanceSchema);
