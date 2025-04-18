const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  script: String,
  language: String,
  stdin: String,
  output: String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Submission', submissionSchema);
