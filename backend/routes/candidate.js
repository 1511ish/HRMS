const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/candidate');

// GET /api/candidates?status=New&position=Senior
router.get('/', candidateController.getAllCandidates);

// POST /api/candidates
router.post('/', candidateController.addCandidate);

// PUT /api/candidates/:id
router.put('/:id', candidateController.updateCandidate);

// DELETE /api/candidates/:id
router.delete('/:id', candidateController.deleteCandidate);

module.exports = router;
