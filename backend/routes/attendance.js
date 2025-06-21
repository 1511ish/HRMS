const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendance');

// GET /api/attendance?date=YYYY-MM-DD
router.get('/', attendanceController.getAttendanceForDate);

router.get('/presented', attendanceController.getPresentEmployees);

router.get('/:status', attendanceController.getFilteredAttendance);

// PUT /api/attendance/:employeeId
router.put('/:employeeId', attendanceController.markAttendance);

module.exports = router;
