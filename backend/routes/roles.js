const express = require('express');
const router = express.Router();

const JobRole = require('../models/JobRole');
const authMiddleware = require('../utils/authMiddleware');

// GET /api/roles - list all job roles (simulated job-portal aggregated data)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const roles = await JobRole.find().select('title industry avg_salary demand_score required_skills source');
    res.json(roles);
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
});

// GET /api/roles/:id - get single role details
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const role = await JobRole.findById(req.params.id);
    if (!role) return res.status(404).json({ message: 'Role not found.' });
    res.json(role);
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
});

module.exports = router;
