
const Leave = require('../models/Leave')

exports.applyLeave = async (req, res) => {
  try {
    const { employeeId, designation, leaveDate, reason, documents, status } = req.body;

    const formattedDate = new Date(leaveDate);

    const newLeave = new Leave({
      employee: employeeId,
      designation,
      leaveDate: formattedDate,
      reason,
      documents,
      status
    });

    await newLeave.save();

    // Now populate the employee name before sending response
    const populatedLeave = await Leave.findById(newLeave._id)
      .populate('employee', 'name');

    res.status(201).json({ message: 'Leave applied successfully', newLeave: populatedLeave });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: 'Failed to apply for leave', details: err.message });
  }
};


exports.updateLeaveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Approved', 'Rejected', 'Pending'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    const updatedLeave = await Leave.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedLeave) {
      return res.status(404).json({ error: 'Leave not found' });
    }

    res.json({ message: 'Leave status updated', status: updatedLeave.status });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update leave status', details: err.message });
  }
};


exports.getAllLeaves = async (req, res) => {
  try {
    const filter = {};

    if (req.query.status) filter.status = req.query.status;

    const leaves = await Leave.find(filter)
      .populate('employee', 'name')
      .sort({ createdAt: -1 });

    // Format leaveDate
    const formattedLeaves = leaves.map(leave => {
      const date = leave.leaveDate;
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();

      return {
        ...leave._doc,
        leaveDate: `${day}/${month}/${year}`
      };
    });

    res.json({
      message: 'Leaves fetched successfully',
      leaves: formattedLeaves
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: 'Failed to fetch leaves',
      details: err.message
    });
  }
};


