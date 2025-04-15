const express = require('express');
const cors = require('cors'); // ✅ Import cors
require('dotenv').config();

const app = express();
app.use(cors()); // ✅ Allow all origins by default
app.use(express.json());

const runCodeRoute = require('./routes/runCode');
app.use('/api', runCodeRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
