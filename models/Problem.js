const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
  category: { type: [String], validate: [arrayLimit, '{PATH} exceeds the limit of 5 categories'], default: [] },
  constraints: { type: [String], default: [] },
  examples: [
    {
      input: { type: String, required: true },
      output: { type: String, required: true },
      explanation: String,
    },
  ],
  starterCode: {
    javascript: String,
    python: String,
    java: String,
    cpp: String,
    rust: String,
  },
  solutionCode: {
    javascript: String,
    python: String,
    java: String,
    cpp: String,
    rust: String,
  },
  hints: { type: [String], default: [] },
  timeLimit: { type: Number, required: true },
  memoryLimit: { type: Number, required: true },
  likes: { type: Number, default: 0 },
  submissions: { type: Number, default: 0 },
  successRate: { type: Number, min: 0, max: 100 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  collection: 'problem',
});

function arrayLimit(val) {
  return val.length <= 5; // Example limit for category array
}

module.exports = mongoose.model('Problem', problemSchema);
