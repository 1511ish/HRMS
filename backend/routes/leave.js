const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leave');

// GET /api/leaves?status=Pending
router.get('/', leaveController.getAllLeaves);

// POST /api/leaves
router.post('/', leaveController.applyLeave);

// PUT /api/leaves/:id/status
router.put('/:id/status', leaveController.updateLeaveStatus);

module.exports = router;
