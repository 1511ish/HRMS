const Employee = require('../models/Employee');

// GET /api/employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    const formattedEmployees = employees.map(emp => {
      // const date = new Date(leave.leaveDate);
      const date = emp.joiningDate;
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
      const year = date.getFullYear();
  
      return {
        ...emp._doc,
        joiningDate: `${day}/${month}/${year}`
      };
    });
    res.status(200).json({employees: formattedEmployees});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/employees
// exports.addEmployee = async (req, res) => {
//   try {
//     const newEmployee = new Employee(req.body);
//     await newEmployee.save();
//     res.status(201).json(newEmployee);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// PUT /api/employees/:id
exports.updateEmployee = async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.status(200).json({updatedEmployee});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE /api/employees/:id
exports.deleteEmployee = async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);

    if (!deletedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
