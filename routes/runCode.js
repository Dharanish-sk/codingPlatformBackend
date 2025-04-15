const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/run-code', async (req, res) => {
  const { script, language, versionIndex, stdin } = req.body;

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
    res.json(response.data);
 
    
  } catch (error) {
     if (error.response) {
      console.error('Response data:', error.response.data);
      res.status(500).json({
        error: 'Execution failed',
        details: error.response.data
      });
    } else {
      res.status(500).json({ error: 'Execution failed', message: error.message });
    }
  }
  
});

function getLanguageId(language) {
  const map = {
    javascript: 63,
    python: 71,
    java: 62,
    cpp: 54,
    c: 50,
  
    // add more mappings if needed
  };
  return map[language] || 71; 
}

module.exports = router;
