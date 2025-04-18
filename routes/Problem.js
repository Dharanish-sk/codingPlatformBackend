const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');
const mongoose = require('mongoose');

// GET /api/problems — get all problems
router.get('/', async (req, res) => {
  try {
    const problems = await Problem.find();
     res.json(problems);
  } catch (err) {
    console.error('🚨 Fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch problems' });
  }
});

// GET /api/problems/:id — get single problem by ID (using _id)
// Route to fetch problem by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
 
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid problem ID format' });
  }

  try {
    const problem = await Problem.findById(id);
    if (!problem) {
       return res.status(404).json({ error: 'Problem not found' });
    }
    res.json(problem);
  } catch (err) {
    console.error(`Error fetching problem with ID: ${id}:`, err); // Check if this is logged
    res.status(500).json({ error: 'Failed to fetch problem' });
  }
});

module.exports = router;
 
