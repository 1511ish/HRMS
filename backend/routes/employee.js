const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee');

// GET /api/employees
router.get('/', employeeController.getAllEmployees);

// POST /api/employees
// router.post('/', employeeController.addEmployee);

// PUT /api/employees/:id
router.put('/:id', employeeController.updateEmployee);

// DELETE /api/employees/:id
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;
