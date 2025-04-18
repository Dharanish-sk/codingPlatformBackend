const express = require('express');
const axios = require('axios');
const router = express.Router();
const Submission = require('../models/Submission'); // ✅ import model

router.post('/run-code', async (req, res) => {
   const { script, language, stdin } = req.body;

  try {
    const response = await axios.post(
      'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true',
      {
        source_code: script,
        language_id: getLanguageId(language),
        stdin: stdin || '',
      },
      {
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
        },
      }
    );

    const output = response.data.stdout || response.data.stderr || 'No output';

    // // ✅ Save to MongoDB
    // const submission = new Submission({ script, language, stdin, output });
    // await submission.save();

    res.json(response.data);
  } catch (error) {
    console.error('Execution failed:', error);
    res.status(500).json({ error: 'Execution failed', details: error.message });
  }
});

// ✅ GET /api/submissions — fetch all submissions
router.get('/submissions', async (req, res) => {
  try {
    const submissions = await Submission.find().sort({ date: -1 });
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
});

function getLanguageId(language) {
  const map = {
    javascript: 63,
    python: 71,
    java: 62,
    cpp: 54,
    c: 50,
  };
  return map[language] || 71;
}

module.exports = router;
